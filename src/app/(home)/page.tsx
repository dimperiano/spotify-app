import { UserProfile } from "@/types";
import { useEffect, useState } from "react";

const clientId = "your-client-id-here";
const redirectUri = "http://localhost:3000/callback";
const scopes = "user-read-private user-read-email";

const generateCodeVerifier = (length: number) => {
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length })
        .map(() => possible.charAt(Math.floor(Math.random() * possible.length)))
        .join("");
};

const generateCodeChallenge = async (verifier: string) => {
    const data = new TextEncoder().encode(verifier);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
};

export default function Home() {
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (!code) {
            const verifier = generateCodeVerifier(128);
            generateCodeChallenge(verifier).then((challenge) => {
                localStorage.setItem("verifier", verifier);

                const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
                    client_id: clientId,
                    response_type: "code",
                    redirect_uri: redirectUri,
                    scope: scopes,
                    code_challenge_method: "S256",
                    code_challenge: challenge,
                }).toString()}`;
                window.location.href = authUrl;
            });
        } else {
            const verifier = localStorage.getItem("verifier");
            fetch("/api/token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, verifier, redirectUri }),
            })
                .then((res) => res.json())
                .then(({ accessToken }) => {
                    fetch("https://api.spotify.com/v1/me", {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    })
                        .then((res) => res.json())
                        .then(setProfile);
                });
        }
    }, []);

    if (!profile) return <div>Loading...</div>;

    return (
        <div>
            <h1>Logged in as {profile.display_name}</h1>
            <img
                src={profile.images?.[0]?.url}
                alt="Profile"
                style={{ borderRadius: "50%", width: 200, height: 200 }}
            />
            <ul>
                <li>User ID: {profile.id}</li>
                <li>Email: {profile.email}</li>
                <li>
                    Spotify URI: <a href={profile.uri}>{profile.uri}</a>
                </li>
                <li>
                    Link: <a href={profile.external_urls?.spotify}>Spotify Profile</a>
                </li>
            </ul>
        </div>
    );
}