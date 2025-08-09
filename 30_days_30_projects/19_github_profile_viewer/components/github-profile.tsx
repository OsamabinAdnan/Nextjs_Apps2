'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import ClipLoader from "react-spinners/ClipLoader";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';
import { ExternalLinkIcon, ForkliftIcon, LocateIcon, RecycleIcon, StarIcon, UsersIcon } from 'lucide-react';

type UserProfile = {
  login: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  followers: number;
  following: number;
  location: string;
}

type UserRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
};

export default function GitHubProfile() {
  const [username, setUsername] = useState<string>("");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRepos, setUserRepos] = useState<UserRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async (): Promise<void> => {
    if (!username.trim()) {
      setError("Please enter a GitHub username");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [profileResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos`)
      ]);
      if (!profileResponse.ok) throw new Error("User not found");
      if (!reposResponse.ok) throw new Error("Repositories not found");

      const profileData: UserProfile = await profileResponse.json();
      const reposData: UserRepo[] = await reposResponse.json();
      setUserProfile(profileData);
      setUserRepos(reposData);
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    fetchUserData();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center py-10 px-4">
      <Card className="w-full max-w-3xl p-6 space-y-6 shadow-xl rounded-2xl backdrop-blur-lg bg-white/40 border border-white/30">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-extrabold text-gray-800 mb-2">GitHub Profile Viewer</CardTitle>
          <CardDescription className="text-gray-600">
            Search for a GitHub username to explore their profile & repositories.
          </CardDescription>
        </CardHeader>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <Input
            type='text'
            placeholder='Enter GitHub username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='flex-1 border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400'
          />
          <Button type="submit" disabled={loading} className="rounded-xl shadow-md">
            {loading ? <ClipLoader size={16} /> : "Search"}
          </Button>
        </form>

        {/* Error */}
        {error && <p className="text-red-500 text-center font-medium">{error}</p>}

        {/* Profile */}
        {userProfile && (
          <div className="grid gap-8">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-[120px] h-[120px] border-4 border-indigo-200 shadow-md">
                <AvatarImage src={userProfile.avatar_url} />
                <AvatarFallback>{userProfile.login.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h2 className="text-3xl font-bold">{userProfile.login}</h2>
                  <Link href={userProfile.html_url} target="_blank" className="text-indigo-600 hover:text-indigo-800">
                    <ExternalLinkIcon className="w-5 h-5" />
                  </Link>
                </div>
                <p className="text-gray-700">{userProfile.bio}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-600">
                  <span className="flex items-center gap-1"><UsersIcon className="w-4 h-4" /> {userProfile.followers} Followers</span>
                  <span className="flex items-center gap-1"><UsersIcon className="w-4 h-4" /> {userProfile.following} Following</span>
                  <span className="flex items-center gap-1"><LocateIcon className="w-4 h-4" /> {userProfile.location || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* Repositories */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">Repositories</h3>
              {userRepos.length === 0 ? (
                <p className="text-gray-500">No repositories found.</p>
              ) : (
                <div className="grid gap-4">
                  {userRepos.map((repo) => (
                    <Card key={repo.id} className="bg-white/80 border border-gray-200 shadow-sm rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.05]">
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <RecycleIcon className="w-6 h-6 text-indigo-500" />
                          <CardTitle>
                            <Link href={repo.html_url} target='_blank' className='text-indigo-700 hover:underline'>
                              {repo.name}
                            </Link>
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{repo.description || "No description"}</p>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between text-gray-600 text-sm">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1"><StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />                          
                            {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1"><ForkliftIcon className="w-4 h-4 text-green-500" />
                            {repo.forks_count}
                          </span>
                        </div>
                        <Link href={repo.html_url} target="_blank" className="text-indigo-600 hover:underline">
                          View on GitHub
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
