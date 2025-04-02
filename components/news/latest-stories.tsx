import React from 'react'

const LatestNewsStories = () => {
    return (
        <div className='max-w-[1450px] mx-auto space-y-6 pt-spacing-24 px-spacing-16 gap-spacing-24 lg:px-spacing-96 pb-spacing-32 lg:pb-spacing-64 lg:gap-spacing-32'>
            <h1 className="text-text-text-primary text-header-blog-small lg:text-header-blog-large">
                Latest Stories
            </h1>
            <p
                className=" text-text-text-secondary text-paragraph-md-regular leading-[28.4px]">
                Read the most recent press releases on CediRates and learn all the news about fintech, blockchain, bitcoin and cryptocurrencies.
            </p>

            <div className="flex flex-col gap-spacing-24 sm:hidden my-6">
                {/* <div className="flex sm:flex-row flex-col sm:gap-5 gap-2.5">
                <BlogCard
                    blog={blogs?.latestStories[0]}
                    main
                    type="default"
                    adBlog={false}
                />
                <BlogCard
                    blog={blogs?.latestStories[1]}
                    main={false}
                    type="default"
                    adBlog={false}
                />
                <div className="my-2 border border-border-border-primary"></div>
                <BlogCard
                    blog={blogs?.latestStories[2]}
                    main={false}
                    type="default"
                    adBlog={false}
                />
            </div> */}
            </div>
        </div>
    )
}

export default LatestNewsStories