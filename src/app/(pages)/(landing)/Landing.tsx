import TaskTypeChip from '@task/components/Card/TaskTypeChip';
import PeriodIcon from 'components/icons/PeriodIcon';
import RepeatIcon from 'components/icons/RepeatIcon';
import TimerIcon from 'components/icons/TimerIcon';
import Link from 'next/link';
import React from 'react'
import { Cards } from './cards';

const Backdrop = () => {
    return (
        <div className="absolute top-0 left-0 z-0 h-full w-full bg-gradient-to-b from-sky-500 to-transparent dark:from-sky-800/70"/>
    );
}

const TopLink = () => {
    return (
        <a
            href="https://github.com/wallodya/23-quest-front"
            className="mb-7 inline-flex items-center justify-between rounded-full bg-sky-100 py-1 px-1 pr-4 text-sm text-sky-700 hover:bg-blue-200 dark:bg-sky-900 dark:text-sky-300 dark:hover:bg-sky-800"
        >
            <span className="mr-3 rounded-full bg-sky-500 px-4 py-1.5 text-xs font-medium text-slate-100">
                Visit
            </span>{" "}
            <span className="text-sm font-medium">
                See source code on my Github
            </span>
            <svg
                aria-hidden="true"
                className="ml-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                ></path>
            </svg>
        </a>
    );
}

export const Landing = () => {
    return (
        <div className="">
            <section className="relative bg-slate-100 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] pt-24 dark:bg-slate-800 dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
                <Backdrop />
                <div className="relative z-10 mx-auto max-w-screen-xl py-8 px-4 text-center lg:py-16">
                    <TopLink />
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                        Manage your daily tasks
                    </h1>
                    <p className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-200 sm:px-16 lg:px-48 lg:text-xl">
                        Simple todo app, that lets you create tasks of different types
                    </p>
                </div>
            </section>
            <section className='grid grid-cols-main'>
                <Cards/>
            </section>
        </div>
    );
};
