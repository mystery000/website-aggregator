# Description

A website aggregator is a website that collects data from other websites across the internet and puts the information in one place where visitors can access it.

# What is ChatGPT?

ChatGPT is an AI language model trained by OpenAI to generate text and interact with users in a human-like conversational manner. It is worth mentioning that ChatGPT is free and open to public use.

Users can submit requests and get information or answers to questions from a wide range of topics such as history, science, mathematics, and current events in just a few seconds.

ChatGPT performs other tasks, such as proofreading, paraphrasing, and translation. It can also help with writing, debugging, and explaining code snippets. Its wide range of capabilities is the reason why ChatGPT has been trending.

# Limitation with ChatGPT

As previously mentioned, ChatGPT is not accessible through a public API. Instead, we can use web scraping techniques to access it. This involves automating the process of logging in to the OpenAI website, solving the captcha (you can use 2captcha for this), and sending an API request with the OpenAI cookies. Fortunately, there is a public library that can handle these tasks for us. Keep in mind that this is not a formal API, so you may encounter limitations if you attempt to make a large number of requests. Additionally, it is not suitable for real-time requests. If you want to use it, consider implementing a queue system for background processing.

# What is the Puppeteer?

Puppeteer is a Node.js library that automates several browser actions such as form submission, crawling single-page applications, UI testing, and in particular, web scraping and generating screenshots of web pages.

# How to communicate with ChatGPT in Node.js

ChatGPT is not yet available as a public API. Therefore, to use it, we have to scrape our way in — meaning we’ll perform a full browser automation that logs in to the OpenAI website, solves the captcha, and send an API request with the OpenAI cookies.

Fortunately, a public library that does this is available and has been installed as part of the project requirement.
