HoloTap Mobile — README (Preview)
(Not committing this yet — just giving you the shape)

Overview
HoloTap Mobile is the consumer‑facing and merchant‑facing mobile application for the HoloTap payment system. Built using Expo SDK 56, React Native 0.86, and Expo Router v6, it provides secure QR‑based payment initiation, session verification, and transaction processing.

Core Features
QR session generation

QR scanning and verification

Secure session token flow

Payment entry and processing

Animated payment result screen (Flow 8 — coming tomorrow)

Merchant dashboard (in progress)

Tech Stack
Expo SDK 56

React Native 0.86

Expo Router v6

TypeScript

Node.js backend (HoloTapServer)

REST API with signed session tokens

Project Structure
Code
app/
  generate-qrc.tsx
  scan-qrc.tsx
  payment.tsx
  (tabs)/merchant-dashboard.tsx
api/
  client.ts
Running the App
Code
npm install
npx expo start
Backend Requirements
Requires HoloTapServer running at:

Code
http://192.168.1.205:3000
Flows Implemented
Flow 5: QR Scan → Session Verification

Flow 6: Payment Initialisation

Flow 7: Payment Submission

Flow 8: Payment Result (tomorrow)
