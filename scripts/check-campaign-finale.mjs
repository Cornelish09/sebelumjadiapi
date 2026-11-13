import assert from 'node:assert/strict'
import fs from 'node:fs'
import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {createServer} from 'vite'
import {campaignHashtag,campaignLinks,movementLink,pledgeOptions} from '../src/content/campaignParticipation.ts'

assert.equal(campaignHashtag,'#SebelumJadiApi')
assert.equal(new Set(pledgeOptions).size,pledgeOptions.length)
assert.equal(pledgeOptions.length,3)
assert.equal(movementLink.url,'https://membership.wwf.id/id')
assert.ok(Object.values(campaignLinks).every(url=>url===null||new URL(url).protocol==='https:'))
const server=await createServer({server:{middlewareMode:true},appType:'custom'})
try{
 const {ShowYourAction}=await server.ssrLoadModule('/src/features/show-your-action/ShowYourAction.tsx')
 const {StayInMovement}=await server.ssrLoadModule('/src/features/stay-in-movement/StayInMovement.tsx')
 const show=renderToStaticMarkup(React.createElement(ShowYourAction))
 const closing=renderToStaticMarkup(React.createElement(StayInMovement))
 for(const text of ['<form','Nama panggilan atau inisial','Asal kota','Pilihan janji','ca-preview-story','<strong>0</strong> janji','Bagikan ke IG Story','Instagram','TikTok','id="show-your-action"','href="#stay-in-the-movement"','https://www.instagram.com/p/Dfl2ALSlBIr/embed/','https://www.instagram.com/p/DfZwRZ3kwrM/embed/','https://www.instagram.com/p/DfOU2JFE5wo/embed/','Garda terdepan pemadaman karhutla di Kalimantan, Papua, dan Sumatra.','Darurat kabut asap pekat dan kemunculan titik api di Palangka Raya.','Orangutan penyintas kobaran api yang kehilangan ruang hidup di Kalimantan.']){
   assert.ok(show.includes(text),text)
 }
 for(const text of ['id="stay-in-the-movement"','id="peat-keeper-card"','Penjaga Kanopi','Memilih menjaga teduhnya hutan sebelum langit berubah kelabu oleh asap.','type="email"',movementLink.url,'href="#take-action"']){
   assert.ok(closing.includes(text),text)
 }
 const page=fs.readFileSync('src/features/jejak-kehidupan/JejakKehidupanPage.tsx','utf8').split('return <>')[1]
 let position=-1
 for(const name of ['WhyItMatters','BeforeTheFire','MakeItPersonal','PreventionLab','TakeAction','ShowYourAction','StayInMovement']){const next=page.indexOf(`<${name}`);assert.ok(next>position,`${name}: urutan bab`);position=next}
 assert.ok(page.indexOf('<footer')>position)
 console.log('PASS: SSR forms, empty local wall, Story and Keeper cards, MoNa link, six chapters plus Lab in order, footer last')
}finally{await server.close()}
