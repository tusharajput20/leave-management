"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function checkAuth() {

            try {

                const response = await fetch("/api/auth/me");

                if (!response.ok) {
                    router.replace("/login");
                    return;
                }

                setLoading(false);

            } catch {
                router.replace("/login");
            }

        }

        checkAuth();

    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return <>{children}</>;
}
