"use client";

/**
 * MemeGenerator Component
 * A React component that allows users to create custom memes by:
 * - Fetching memes from the imgflip API
 * - Adding custom text to memes
 * - Dragging text to position it
 * - Downloading the customized meme
 */

import html2canvas from 'html2canvas';
import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { Button } from './ui/button';
import Draggable from 'react-draggable';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

/**
 * Interface for a meme template from the imgflip API
 * @property {string} id - Unique identifier for the meme
 * @property {string} name - Display name of the meme
 * @property {string} url - Direct URL to the meme image
 */
type Meme = {
    id: string;
    name: string;
    url: string;
}

/**
 * Interface for tracking the position of draggable text
 * @property {number} x - Horizontal position of the text
 * @property {number} y - Vertical position of the text
 */
type Position = {
    x: number;
    y: number;
}

export default function MemeGenerator() {
    // State to store all fetched memes
    const [memes, setMemes] = useState<Meme[]>([]);

    // Maintains the currently visible subset of memes in the carousel
    const [visibleMemes, setVisibleMemes] = useState<Meme[]>([]);

    // State to track the currently selected meme
    const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);

    // State to store user-entered text for the meme
    const [text, setText] = useState<string>("");

    // State to store the position of the draggable text on the meme
    const [textPosition, setTextPosition] = useState<Position>({ x: 0, y: 0 });

    // Loading state when initially fetching memes
    const [loading, setLoading] = useState<boolean>(true);

    // Loading state when loading more memes
    const [moreLoading, setMoreLoading] = useState<boolean>(false);

    // Mounted state for the draggable text
    const [hasMounted, setHasMounted] = useState<boolean>(false);

    // Ref to the meme container (used for screenshot)
    const memeRef = useRef<HTMLDivElement>(null);

    // Ref to the draggable text element
    const draggableRef = useRef<HTMLDivElement>(null);

    // Number of memes to show at a time
    const memesPerLoad = 4;

    // Effect to fetch memes once on component mount
    useEffect(() => {
        const fetchMemes = async () => {
            try {
                setLoading(true); // Start loading spinner

                // Fetch memes from imgflip API
                const response = await fetch('https://api.imgflip.com/get_memes');
                const data = await response.json(); // Parse response

                // Save all memes and show the first `memesPerLoad` memes
                setMemes(data.data.memes);
                setVisibleMemes(data.data.memes.slice(0, memesPerLoad));

                setLoading(false); // Stop loading spinner
                setHasMounted(true); // Set mounted state to true
            } catch (error: unknown) {
                console.error('Error fetching memes:', error);
                setLoading(false); // Stop loading even if error occurs
                if (!hasMounted){
                    return null       
                }
            }
        };

        fetchMemes(); // Run the fetch function
    }, []);

    // Function to load more memes into the visible carousel
    const loadMoreMemes = (): void => {
        setMoreLoading(true); // Start loading state for more memes

        // Get more memes up to the next chunk
        const newVisibleMemes = memes.slice(0, visibleMemes.length + memesPerLoad);

        // Update visible memes in the UI
        setVisibleMemes(newVisibleMemes);

        setMoreLoading(false); // Done loading
    };

    // Function to handle downloading the meme with overlaid text
    const handleDownload = async (): Promise<void> => {
        try {
            if (memeRef.current) {
                // Convert the meme div (with text) into a canvas image
                const canvas = await html2canvas(memeRef.current, {
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: null,
                    scale: 2, // Improve quality
                    logging: false, // Disable logging
                });

                // Convert canvas to blob
                canvas.toBlob((blob) => {
                    if (blob) {
                        // Create object URL
                        const url = URL.createObjectURL(blob);
                        
                        // Create temporary link and trigger download
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = `meme-${Date.now()}.png`;
                        document.body.appendChild(link);
                        link.click();
                        
                        // Cleanup
                        document.body.removeChild(link);
                        URL.revokeObjectURL(url);
                    }
                }, 'image/png', 1.0);
            }
        } catch (error) {
            console.error('Error downloading meme:', error);
        }
    };

    // JSX template to be added here
    return (
        <>
            {/* Meme Generator UI will go here */}
            <div className='flex flex-col items-center justify-center min-h-screen bg-background text-foreground'>
                <div className='max-w-4xl w-full px-4 py-8 sm:px-6 lg:px-8'>
                    <div className='flex flex-col items-center justify-center space-y-8'>
                        {/* Header Section */}
                        <div className='text-center space-y-2'>
                            <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>Meme Generator</h1>
                            <p className='text-muted-foreground'>Create custom memes with out easy-to-use generator</p>
                        </div>
                        {/* Loading spinner or meme carousel */}
                        {loading ? 
                            (
                                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"/>
                            ):(
                                <>
                                {/* Meme carousel */}
                                <div className='w-full overflow-x-scroll whitespace-nowrap py-2'>
                                    {visibleMemes.map((meme) => (
                                        <Card key={meme.id} className='inline-block bg-muted rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 mx-2'onClick={()=>setSelectedMeme(meme)}
                                        >
                                            <Image
                                                src={meme.url}
                                                alt={meme.name}
                                                width={300}
                                                height={300}
                                            />
                                            <CardContent>
                                                <p className='text-center mt-2'>{meme.name}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                                {/* Load more memes button */}
                                {visibleMemes.length < memes.length && (
                                    <Button
                                        onClick={loadMoreMemes}
                                        className='mt-4'
                                        disabled={moreLoading}
                                    >
                                        {moreLoading ? (
                                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                                        ):(
                                            "Load More"
                                        )}
                                    </Button>
                                )}
                                </>
                            )
                        }
                        {/* Meme customization section */}
                        {hasMounted && selectedMeme && (
                            <Card className='w-full max-w-md'>
                                <CardHeader>
                                    <CardTitle>Customize Your Meme</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div 
                                        ref={memeRef}
                                        className='relative bg-muted rounded-lg overflow-hidden'
                                    >
                                        <Image
                                            src={selectedMeme.url}
                                            alt={selectedMeme.name}
                                            width={300}
                                            height={300}
                                            className='object-cover w-full h-full'
                                        />
                                        <Draggable
                                            nodeRef={draggableRef}
                                            position={textPosition}
                                            onStop={(_, data)=> {
                                                setTextPosition({
                                                    x: data.x,
                                                    y: data.y
                                                });
                                            }}
                                            bounds="parent"
                                        >
                                            <div 
                                                ref={draggableRef}
                                                className='absolute text-black text-xl font-bold text-center px-2 py-1'
                                                style={{
                                                    textShadow: '2px 2px 4px rgba(255,255,255,0.8)',
                                                    cursor: 'move'
                                                }}
                                            >
                                                {text}
                                            </div>
                                        </Draggable>
                                    </div>
                                    <div className='mt-4'>
                                        {/* Text input for adding meme text */}
                                        <Label htmlFor='meme-text'>Add your text</Label>
                                        <Textarea
                                            id='meme-text'
                                            placeholder='Enter your meme text'
                                            className='mt-1 w-full'
                                            rows={3}
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                        />
                                    </div>
                                    <Button className='w-full mt-4 cursor-pointer' onClick={handleDownload}>
                                        Download Meme
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
