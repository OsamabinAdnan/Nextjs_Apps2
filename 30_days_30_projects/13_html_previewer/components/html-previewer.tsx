'use client'
import React, { ChangeEvent, useRef, useState, useLayoutEffect } from 'react'
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { predefinedHtml } from './Predefined_Html';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


export default function HtmlPreviewer() {
    const [htmlCode, setHtmlCode] = useState<string>('');
    const [previewHtml, setPreviewHtml] = useState<string>('');
    const backgroundRef = useRef(null);
    const shape1Ref = useRef(null);
    const shape2Ref = useRef(null);
    const shape3Ref = useRef(null);

    useGSAP(() => {
        // Background color animation
        gsap.to(backgroundRef.current, {
            backgroundColor: 'transparent',
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
        });

        // Shape 1 animation (Circle)
        gsap.to(shape1Ref.current, {
            rotate: 360,
            x: 'random(-250, 250)',
            y: 'random(-250, 250)',
            scale: 'random(0.8, 1.2)',
            duration: 'random(4, 6)',
            repeat: -1,
            ease: 'none',
            yoyo: true,
        });

        // Shape 2 animation (Square)
        gsap.to(shape2Ref.current, {
            rotate: -360,
            x: 'random(-250, 250)',
            y: 'random(-100, 450)',
            scale: 'random(0.5, 1.5)',
            duration: 'random(2, 8)',
            repeat: -1,
            ease: 'power1.inOut',
            yoyo: true,
        });

        // Shape 3 animation (Triangle)
        gsap.to(shape3Ref.current, {
            rotate: 'random(-360, 360)',
            x: 'random(-175, 175)',
            y: 'random(-175, 175)',
            scale: 'random(0.7, 1.3)',
            duration: 'random(2, 12)',
            repeat: -1,
            ease: 'sine.inOut',
            yoyo: true,
        });
    }, [])

    // Handler to generate HTML preview
    const handlePreview = () => {
        setPreviewHtml((htmlCode));
    }

    // Handle to paste predefined HTML in the textarea
    const handlePasteHtml = () => {
        setHtmlCode(predefinedHtml)
    }

    // Handler for updating HTML code state on textarea change
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setHtmlCode(e.target.value);
    }

// JSX return statement rendering the HTML previewer UI
  return (
    <>
        {/* Background and Shapes */}
        <div ref={backgroundRef} className='fixed top-0 left-0 w-full h-full -z-10 overflow-hidden'>
            {/* Circles */}
            <div 
                ref={shape1Ref}
                className="absolute top-1/4 left-1/6 w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-600/30"
            />
            {/* Squares */}
            <div 
                ref={shape2Ref}
                className="absolute top-1/2 left-1/2 w-24 h-24 md:w-32 md:h-32 bg-purple-600/30"
            />
            
            {/* Triangles */}
            <div 
                ref={shape3Ref}
                className="absolute bottom-1/4 right-1/6 w-0 h-0 
                border-l-[60px] md:border-l-[100px] border-l-transparent 
                border-b-[90px] md:border-b-[150px] border-b-green-600/30 
                border-r-[60px] md:border-r-[100px] border-r-transparent"
            />
        </div>

        <div className='flex flex-col items-center justify-start min-h-screen px-4 py-6 md:mt-10 md:mb-4 relative z-10'>
            {/* Center the HTML previewer card within the screen */}
            <div className='w-full max-w-2xl p-4 md:p-6 rounded-lg shadow-2xl shadow-gray-300 border-2 bg-white/10 backdrop-blur-sm'>
                <h1 className='text-xl md:text-2xl font-bold mb-2 md:mb-4 text-center'>HTML Previewer</h1>
                <p className='text-sm md:text-base text-muted-foreground mb-4 text-center'>Enter your HTML code and see preview.</p>
                <div className='grid gap-4'>
                    {/* Textarea for entering HTML code */}
                    <Textarea
                        value={htmlCode}
                        onChange={handleChange}
                        placeholder='Enter your HTML code here...'
                        className='p-3 md:p-4 rounded-lg border border-input text-foreground text-sm md:text-base'
                        rows={6}
                    />
                    {/* Buttons to generate preview and paste predefined HTML */}
                    <div className='flex flex-col sm:flex-row justify-center gap-2'>
                        <Button onClick={handlePreview}>Generate Preview</Button>
                        <Button onClick={handlePasteHtml}>For Sample Preview</Button>
                    </div>
                    {/* Div to display the HTML preview */}
                    <div className='flex items-center justify-center w-full'>
                        <div 
                            className="w-full min-h-[150px] md:min-h-[200px] p-3 md:p-4 rounded-lg bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700"
                            dangerouslySetInnerHTML={{ __html: previewHtml || '<div class="text-muted-foreground text-center py-8">Preview will appear here...</div>' }} 
                        />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
