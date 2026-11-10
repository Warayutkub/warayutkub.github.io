---
title: wridge — สะพานระหว่าง AI, Figma และโค้ด
label: wridge
summary: แอปเดสก์ท็อปบน Windows ที่ทำให้ AI อย่าง Claude Code อ่านและแก้ไฟล์ Figma ได้โดยตรงผ่านปลั๊กอิน ทั้งหน้าจอ component prototype และ motion พร้อม "สมอง" ของแต่ละโปรเจกต์ที่จำโน้ต การตัดสินใจ และงานที่ส่งต่อข้ามแชท มี code graph กับแผนผังฐานข้อมูลที่อ่านจากโค้ดจริง กระดานงานที่ AI เสนองานให้กดรับหรือข้าม รายงานพร้อมกราฟที่ export เป็น PNG/PDF และหน้าดู GitHub Actions ทุกอย่างทำงานในเครื่อง ไม่ส่งไฟล์ออกไปไหน เริ่มจากเป็นเครื่องมือที่ทำไว้ใช้เองตอนออกแบบงานคู่กับ AI แล้วพัฒนาเป็นแอปที่ดาวน์โหลดได้ ออกแบบใน Figma และเขียนเองทั้งหมดด้วย Rust + Tauri
category: desktop app
year: 2026
status: live
liveUrl: https://warayutkub.github.io/wridge/
tags: [Desktop app, Rust, Tauri, Figma plugin, MCP]
cover: ./cover.jpg
order: 1
featured: true
screens:
  - src: ./screen-1.jpg
    caption: "หน้าแรกของแอป: เห็นว่า AI, สมองของโปรเจกต์ และ Figma ต่อกันอยู่ไหม แล้ว AI กำลังทำอะไร"
    alt: หน้า Overview ของแอป wridge
  - src: ./screen-2.jpg
    caption: กระดานงานที่คนกับ AI ใช้ร่วมกัน AI เสนองานหรือขอให้ตรวจ แล้วเรากดรับหรือข้าม
    alt: หน้า Tasks แบบ Kanban
  - src: ./screen-3.jpg
    caption: แผนผังฐานข้อมูลที่อ่านจากไฟล์ SQL ในโปรเจกต์ กดตารางหรือคอลัมน์เพื่อดูโค้ดที่ใช้มัน
    alt: หน้า Data แสดง ER diagram
shots:
  - src: ./shot-1.jpg
    alt: กราฟโน้ตและการตัดสินใจของโปรเจกต์
  - src: ./shot-2.jpg
    alt: ภาพที่ AI วาดใน Figma ผ่านเครื่องมือดัดรูปทรงของ wridge
  - src: ./shot-3.jpg
    alt: รายงานรายสัปดาห์ที่ AI เขียนพร้อมกราฟ
---
