"use client";
import { useRef } from "react";
import apiClient from "../../lib/axios";
import BuyMeACoffee from "../Atoms/BuyMeACoffee";
import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";

export default function NewsletterForm() {
    const inputRef = useRef(null);
    const {
        data,
        mutateAsync: subscribe,
        status,
        error,
        reset,
    } = useMutation({
        mutationFn: async (e) => {
            e.preventDefault();

            const response = await apiClient.post("/api/subscribe", {
                email: inputRef.current.value,
            });

            return response;
        },
        onError: async (error) => {
            console.log(error.response.data.error.title);
        },
        onSettled: () => {
            inputRef.current == null;
        },
    });

    return (
        <div className="flex flex-col items-center gap-2">
            <form className="form-control gap-y-2" onSubmit={subscribe}>
                <label className="label">
                    <span className="label-text">
                        Sign up to our newsletter
                    </span>
                </label>

                <input
                    className={clsx(
                        "input-border input w-full max-w-xs",
                        status === "success"
                            ? "input-success"
                            : status === "error"
                            ? "input-error"
                            : status === "loading"
                            ? "input-info"
                            : "input-primary"
                    )}
                    type="email"
                    id="email"
                    disabled={status === "loading" || status === "success"}
                    placeholder="example@example.com"
                    ref={inputRef}
                    required
                    autoCapitalize="off"
                    autoCorrect="off"
                />
                {status === "error" && (
                    <div className="alert alert-error py-1 shadow-lg">
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 flex-shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                            <span>{error.response.data.error.title}</span>
                        </div>
                    </div>
                )}
                {status === "success" ? (
                    <div className="alert alert-success shadow-lg">
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 flex-shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>Thanks!</span>
                        </div>
                    </div>
                ) : (
                    <button
                        className="btn-primary btn"
                        type="submit"
                        value=""
                        disabled={status === "success"}
                        name="subscribe"
                    >
                        Subscribe
                    </button>
                )}

                <BuyMeACoffee />
            </form>
        </div>
    );
}
