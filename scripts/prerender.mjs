import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
writeFileSync('dist/index.html', await page.content());
await browser.close();
