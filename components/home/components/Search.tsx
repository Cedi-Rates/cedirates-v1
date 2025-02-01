import React from 'react'
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
    X,
} from "lucide-react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'

const Search = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="relative cursor-pointer">
                    <div className="border xl:border-none border-border-border-secondary rounded-md p-2 xl:absolute xl:inset-y-0 xl:start-0 xl:flex xl:items-center xl:ps-3">
                        <svg className="w-4 h-4 text-text-text-placeholder" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <Input
                        type="text"
                        className="w-full ps-10 bg-background-bg-white placeholder-text-text-placeholder placeholder:text-[#bfbfbf] appearance-none border border-border-border-secondary rounded-radius-[10px] cursor-pointer hidden xl:block !focus:outline-none"
                        placeholder="Search...."
                    />
                    <div className='absolute inset-y-0 end-0 items-center pe-3 hidden xl:flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-slash text-text-text-placeholder">
                            <rect width="18" height="18" x="3" y="3" rx="2" /><line x1="9" x2="15" y1="15" y2="9" />
                        </svg>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-[900px] max-h-full rounded-none md:rounded-lg top-0 px-2 py-4">
                <Command className="">
                    <CommandInput
                        className=''
                        placeholder="Type a command or search..."
                    />
                    <CommandList className='max-h-full'>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            <CommandItem className='py-5'>
                                <Calendar />
                                <span>Calendar</span>
                            </CommandItem>
                            <CommandItem className='py-5'>
                                <Smile />
                                <span>Search Emoji</span>
                            </CommandItem>
                            <CommandItem className='py-5' disabled>
                                <Calculator />
                                <span>Calculator</span>
                            </CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Settings">
                            <CommandItem className='py-5'>
                                <User />
                                <span>Profile</span>
                                <CommandShortcut>⌘P</CommandShortcut>
                            </CommandItem>
                            <CommandItem className='py-5'>
                                <CreditCard />
                                <span>Billing</span>
                                <CommandShortcut>⌘B</CommandShortcut>
                            </CommandItem>
                            <CommandItem className='py-5'>
                                <Settings />
                                <span>Settings</span>
                                <CommandShortcut>⌘S</CommandShortcut>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </DialogContent>
        </Dialog>
    )
}

export default Search
