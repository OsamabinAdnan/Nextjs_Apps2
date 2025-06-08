'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Card } from './ui/card';
import { Button } from './ui/button';
import { MinusIcon, PauseIcon, PlayIcon, PlusIcon, RefreshCwIcon } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import Link from 'next/link';

// Define types for the timer status and session type
type TimerStatus = "idle" | "running" | "paused";
type SessionType = "work" | "break";

// Define a TypeScript interface for the Pomodoro state
interface PomodoroState {
    workDuration: number; // in seconds
    breakDuration: number; // in seconds
    currentTime: number; // in seconds
    currentSession: SessionType; // work or break
    timerStatus: TimerStatus; // running, paused, or stopped
}

// Default export of the PomodoroTimerComponent function
export default function PomodoroTimer() {
    const [state, setState] = useState<PomodoroState>({
        workDuration: 25 * 60, // 25 minutes in seconds
        breakDuration: 5 * 60, // 5 minutes in seconds
        currentTime: 25 * 60, // Start with work session
        currentSession: "work", // Start with work session
        timerStatus: "idle", // Timer is initially idle
    })

    // Reference for storing the timer interval
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Effect hook to handle the timer logic
    useEffect(()=> {
        if (state.timerStatus === "running" && state.currentTime > 0) {
            timerRef.current = setInterval(() => {
                setState((prevState) => ({
                    ...prevState,
                    currentTime: prevState.currentTime - 1
                }))
            }, 1000); // Update every second
        }  else if (state.currentTime === 0) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            handleSessionSwitch(); 
        }
        return () => clearInterval(timerRef.current as NodeJS.Timeout);
    }, [state.timerStatus, state.currentTime]);

    // Function to handle switching between work and break sessions
    const handleSessionSwitch = (): void => {
        setState((prevState) => {
            const isWorkSession = prevState.currentSession === "work";
            return {
                ...prevState,
                currentSession: isWorkSession ? "break" : "work",
                currentTime: isWorkSession ? prevState.breakDuration : prevState.workDuration,
            }
        })
    };

    // Function to handle start and pause actions
    const handleStartPause = (): void => {
        if (state.timerStatus === "running") {
        setState((prevState) => ({
            ...prevState,
            timerStatus: "paused",
        }));
        clearInterval(timerRef.current as NodeJS.Timeout);
        } else {
            setState((prevState) => ({
                ...prevState,
                timerStatus: "running",
            }));
        }
    };

    // Function to reset the timer
    const handleReset = (): void => {
        clearInterval(timerRef.current as NodeJS.Timeout);
        setState((prevState) => ({
            ...prevState,
            currentTime: prevState.workDuration,
            currentSession: "work",
            timerStatus: "idle",
        }));
    };

     // Function to handle changes in duration for work and break sessions
    const handleDurationChange = (
        type: SessionType,
        increment: boolean
    ): void => {
        setState((prevState) => {
            const durationChange = increment ? 60 : -60;
            if (type === "work") {
                return {
                ...prevState,
                workDuration: Math.max(60, prevState.workDuration + durationChange),
                currentTime:
                    prevState.currentSession === "work"
                    ? Math.max(60, prevState.workDuration + durationChange)
                    : prevState.currentTime,
                };
            } else {
                return {
                    ...prevState,
                    breakDuration: Math.max(60, prevState.breakDuration + durationChange),
                    currentTime:
                        prevState.currentSession === "break"
                        ? Math.max(60, prevState.breakDuration + durationChange)
                        : prevState.currentTime,
                };
            }
        });
    };

    // Function to format time in mm:ss format
    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
    };


    // JSX return statement rendering the Pomodoro timer UI
  return (
    <>
    <div className='flex items-center justify-center min-h-screen'>
        {/* Center the Pomodoro timer card within the screen */}
        <Card className='w-full max-w-md p-6 shadow-lg rounded-lg'>
            <div className='flex flex-col items-center justify-center gap-6'>
                {/* Header with title and description */}
                <h1 className='md:text-4xl text-2xl text-center font-bold'>Pomodoro Timer</h1>
                <p className='md:text-lg text-sm text-center font-medium'>A timer for the Pomodoro Technique</p>
                <div className='flex flex-col items-center gap-4'>
                    {/* Display current session (work or break) */}
                    {/* <div className='text-2xl font-medium'>
                        <span className={`text-${state.currentSession === "work" ? "primary": "secondary"}`}>
                            {state.currentSession == "work" ? "Work": "Break"}
                        </span>
                    </div> */}
                    {/* Display formatted time */}
                    <div className='md:text-8xl text-5xl font-bold'>
                        {formatTime(state.currentTime)}
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                     {/* Buttons to change duration, start/pause, and reset timer */}
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDurationChange("work", false)}
                        className='hover:bg-primary hover:text-white'
                    >
                        <MinusIcon className="h-6 w-6" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDurationChange("work", true)}
                        className='hover:bg-primary hover:text-white'
                    >
                        <PlusIcon className="h-6 w-6" />
                    </Button>
                    <Button 
                        variant="outline"
                        size="icon"
                        onClick={handleStartPause}
                        className='hover:bg-primary hover:text-white'
                    >
                        {state.timerStatus === "running" ? (
                            <PauseIcon className="h-6 w-6" />
                        ) : (
                            <PlayIcon className="h-6 w-6" />
                        )}
                    </Button>
                    <Button 
                        variant="outline"
                        size="icon"
                        onClick={handleReset}
                        className='hover:bg-primary hover:text-white'
                    >
                        <RefreshCwIcon className="h-6 w-6" />
                    </Button>
                </div>
                <div className='p-2'>
                    {/* AlertDialog for explaining the Pomodoro Technique */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="default" className='text-sm'>Pomodoro Technique</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="w-full max-w-2xl p-4 md:p-6">
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    <strong>➡️ Explanation of Pomodoro Technique 🔥</strong>
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    <strong>The Pomodoro Technique </strong>
                                    {`is a time management method that uses a timer to break work into intervals called Pomodoros. The Pomodoro timer is traditionally set for 25 minutes, but can be customized to fit your needs. The basic steps are:`}{" "}
                                    <br />
                                    <br />
                                    <ol>
                                        <strong>
                                            <li>1. Select a single task to focus on.</li>
                                            <li>
                                            2. Set a timer for 25-30 min. and work continuously
                                            until the timer goes off.
                                            </li>
                                            <li>
                                            3. Take a productive 5 min. break-walk around, get a
                                            snack, relax.
                                            </li>
                                            <li>4. Repeat steps 2 & 3 for 4 rounds.</li>
                                            <li>5. Take a longer (20-30 min.) break.</li>
                                        </strong>
                                    </ol>
                                    <br />
                                    <Button>
                                        {" "}
                                        <Link 
                                            href="https://todoist.com/productivity-methods/pomodoro-technique"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            Click here to Read more! 
                                        </Link>
                                    </Button>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </Card>
    </div>
    </>
    
  )
}
