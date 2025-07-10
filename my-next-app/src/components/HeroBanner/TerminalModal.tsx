"use client";
import { useEffect, useRef, useState } from "react";

type HistoryEntry = {
    command: string;
    output: string[];
};

type TerminalModalProps = {
    onClose: () => void;
};

type FileNode = {
    type: "file";
    content: string;
};

type DirNode = {
    type: "dir";
    contents: {
        [key: string]: FileOrDirNode;
    };
};

type FileOrDirNode = FileNode | DirNode;

function isDirNode(node: FileOrDirNode | null): node is DirNode {
    return !!node && node.type === "dir";
}

function isFileNode(node: FileOrDirNode | null): node is FileNode {
    return !!node && node.type === "file";
}

const fileSystem: { [path: string]: DirNode } = {
    "/": {
        type: "dir",
        contents: {
            "about.txt": {
                type: "file",
                content: "I'm a frontend developer with a love for good UI.",
            },
            projects: {
                type: "dir",
                contents: {
                    "website.txt": {
                        type: "file",
                        content: "My personal portfolio site.",
                    },
                    "game.txt": {
                        type: "file",
                        content: "A hobby game project.",
                    },
                },
            },
            "contact.txt": {
                type: "file",
                content: "Email: hello@ryantibbetts.dev",
            },
        },
    },
};


const splashArt = [
    "     ____        __           ",
    "    / __ \\____ _/ /_____  ____",
    "   / /_/ / __ `/ __/ __ \\/ __ \\",
    "  / ____/ /_/ / /_/ /_/ / / / /",
    " /_/    \\__,_/\\__/\\____/_/ /_/ ",
    "Welcome to Ryan's Portfolio Terminal!",
    "Type `help` to begin.",
];

const TerminalModal = ({ onClose }: TerminalModalProps) => {
    const [cwd, setCwd] = useState<string[]>([]);
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [input, setInput] = useState("");
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const audio = new Audio("/sounds/terminal-start.mp3");
        audio.volume = 0.4;
        audio.play().catch(() => { });
    }, []);

    const getNodeAtPath = (path: string[]): FileOrDirNode | null => {
        let node: FileOrDirNode = fileSystem["/"];
        for (const segment of path) {
            if (node.type === "dir" && node.contents[segment]) {
                node = node.contents[segment];
            } else {
                return null;
            }
        }
        return node;
    };

    const getPrompt = () =>
        `ryan@portfolio:${cwd.length > 0 ? "/" + cwd.join("/") : "~"}$`;

    const handleCommand = (cmd: string): string[] => {
        const args = cmd.trim().split(" ");
        const base = args[0];
        const node = getNodeAtPath(cwd);

        if (base === "cd" && args[1] === "~") {
            setCwd([]);
            return [];
        }

        if (base === "ls" && args[1] === "-l") {
            const node = getNodeAtPath(cwd);
            if (node?.type === "dir") {
                return Object.keys(node.contents).map((k) => `-rw-r--r-- 1 user user 0 Jan 01 00:00 ${k}`);
            }
            return ["Not a directory"];
        }

        switch (base) {
            case "help":
                return ["Available commands: ls, cd [dir], cat [file], clear, exit"];
            case "ls": {
                if (!isDirNode(node)) return ["Not a directory"];
                return [Object.keys(node.contents).join("  ")];
            }
            case "cd": {
                const target = args[1];
                if (!target) return ["Usage: cd [dir]"];
                if (target === "..") {
                    setCwd((prev) => prev.slice(0, -1));
                    return [];
                }

                if (!isDirNode(node)) return ["Not a directory"];
                const next = node.contents?.[target];

                if (isDirNode(next)) {
                    setCwd((prev) => [...prev, target]);
                    return [];
                }

                return ["No such directory"];
            }
            case "cat": {
                const target = args[1];
                if (!target) return ["Usage: cat [file]"];
                if (!isDirNode(node)) return ["Not a directory"];

                const fileNode = node.contents?.[target];
                if (isFileNode(fileNode)) {
                    return [fileNode.content];
                }
                return ["File not found"];
            }
            case "clear":
                setHistory([]);
                return [];
            case "exit":
                onClose();
                return [];
            case "npm":
                if (args[1] === "start") {
                    playSound("npm");
                    return [
                        "> portfolio@1.0.0 start",
                        "> next dev",
                        "",
                        "ready - started server on http://localhost:3000",
                        "info  - Loaded env from .env.local",
                        "event - compiled successfully in 521 ms",
                    ];
                }
                return ["Unknown npm command"];
            case "git":
                if (args[1] === "log") {
                    return [
                        "commit d4e8f7c (HEAD -> main)",
                        "Author: Ryan Tibbetts <you@example.com>",
                        "Date:   Mon Jul 8 10:15:00 2025 -0700",
                        "    polish terminal UX",
                        "",
                        "commit a1b2c3d",
                        "Author: Ryan Tibbetts <you@example.com>",
                        "Date:   Sun Jul 7 21:30:00 2025 -0700",
                        "    add animation and caret",
                    ];
                }
                return ["Unknown git command"];
            case "sudo":
                if (args[1] === "make" && args[2] === "me" && args[3] === "a" && args[4] === "sandwich") {
                    return ["Okay."];
                }
                return ["Permission denied"];

            default:
                return [`command not found: ${cmd}`];
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const trimmed = input.trim();
            if (!trimmed) return;
            const output = handleCommand(trimmed);
            if (trimmed !== "clear" && trimmed !== "exit") {
                setHistory((prev) => [...prev, { command: trimmed, output }]);
                setCommandHistory((prev) => [...prev, trimmed]);
            }
            setInput("");
            setHistoryIndex(null);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHistoryIndex((prev) => {
                const next = prev === null ? commandHistory.length - 1 : prev - 1;
                if (next >= 0) {
                    setInput(commandHistory[next]);
                    return next;
                }
                return prev;
            });
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setHistoryIndex((prev) => {
                if (prev === null) return null;
                const next = prev + 1;
                if (next < commandHistory.length) {
                    setInput(commandHistory[next]);
                    return next;
                } else {
                    setInput("");
                    return null;
                }
            });
        } else if (e.key === "Tab") {
            e.preventDefault();
            const [base, partial = ""] = input.trim().split(" ");
            const node = getNodeAtPath(cwd);
            const suggestions =
                (base === "cd" || base === "cat") && isDirNode(node)
                    ? Object.keys(node.contents ?? {}).filter((k) =>
                        k.startsWith(partial)
                    )
                    : [];
            if (suggestions.length === 1) {
                setInput(`${base} ${suggestions[0]}`);
            }
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [history]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    useEffect(() => {
        const terminal = document.querySelector("#terminal-scroll");
        terminal?.scrollTo({ top: terminal.scrollHeight, behavior: "smooth" });
    }, [history]);

    useEffect(() => {
        setHistory([
            { command: "", output: splashArt },
        ]);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black bg-opacity-90 backdrop-blur-sm transition-opacity animate-fade-in" />
            <div className="relative max-w-3xl w-full mx-4 p-6 text-left font-mono text-sm text-green-500 bg-black border border-green-800 rounded-lg shadow-xl animate-scale-fade-in overflow-y-auto max-h-[90vh]">
                <div
                    id="terminal-scroll"
                    className="overflow-y-auto max-h-[90vh] text-left space-y-2"
                >
                    {history.map((entry, i) => (
                        <div key={i}>
                            <div>
                                <span className="text-blue-400">{getPrompt()}</span>{" "}
                                {entry.command}
                            </div>
                            {entry.output.map((line, j) => (
                                <div key={j}>{line}</div>
                            ))}
                        </div>
                    ))}

                    <div className="flex items-center">
                        <label className="text-blue-400 mr-2">{getPrompt()}</label>
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-black text-green-500 outline-none caret-green-500 animate-blink-caret"
                            autoComplete="off"
                            spellCheck={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TerminalModal;
