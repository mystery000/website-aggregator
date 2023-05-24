//👇🏻 Import Puppeteer at the top
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const puppeteer = require('puppeteer')
import { ChatGPTAPI } from 'chatgpt'
const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 4000

dotenv.config()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world',
    })
})

//👇🏻 holds all the ChatGPT result
const database = []
//👇🏻 generates a random string as ID
const generateID = () => Math.random().toString(36).substring(2, 10)

async function chatgptFunction(content) {
    // use puppeteer to bypass cloudflare (headful because of captchas)
    const api = new ChatGPTAPI({
        email: process.env.email,
        password: process.env.password,
    })
    await api.initSession()
    //👇🏻 Extracts the brand name from the website content
    const getBrandName = await api.sendMessage(
        `I have a raw text of a website, what is the brand name in a single word? ${content}`
    )
    //👇🏻 Extracts the brand description from the website content
    const getBrandDescription = await api.sendMessage(
        `I have a raw text of a website, can you extract the description of the website from the raw text. I need only the description and nothing else. ${content}`
    )
    //👇🏻 Returns the response from ChatGPT
    return {
        brandName: getBrandName.response,
        brandDescription: getBrandDescription.response,
    }
}

app.post('/api/url', (req, res) => {
    const { url } = req.body
    ;(async () => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(url)
        const websiteContent = await page.evaluate(() => {
            return document.documentElement.innerText.trim()
        })
        const websiteOgImage = await page.evaluate(() => {
            const metas = document.getElementsByTagName('meta')
            for (let i = 0; i < metas.length; i++) {
                if (metas[i].getAttribute('property') === 'og:image') {
                    return metas[i].getAttribute('content')
                }
            }
        })
        //👇🏻 accepts the website content as a parameter
        let result = await chatgptFunction(websiteContent)
        //👇🏻 adds the brand image and ID to the result
        result.brandImage = websiteOgImage
        result.id = generateID()
        //👇🏻 adds the result to the array
        database.push(result)
        //👇🏻 returns the results
        return res.json({
            message: 'Request successful!',
            database,
        })
        await browser.close()
    })()
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})
