import { useState, useCallback, useRef, useEffect, Fragment } from "react";
import { supabase } from "./supabase.js";

// ── SVG Logos ─────────────────────────────────────────────────────────────────
const LogoMarkWhite = ({ height = 34 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 157.28 130.75" height={height} style={{display:"block"}}>
    <path fill="#fff" d="M144.14,70.04c-6.77,20.85-15.36,31.09-28.89,31.09-17.19,0-30.72-14.08-30.72-38.4,0-15.18,3.29-24.69,5.12-30.54,8.96,.73,18.29,1.1,27.61,1.65v6.22l-7.13,.73c-16.46,1.65-19.02,8.23-19.02,25.42,0,15.54,7.31,24.87,18.84,24.87,10.06,0,17.19-6.4,24.5-28.16,7.14-20.56,13.24-31.46,22.84-35.04V0H0V60c4.69,.03,10.17,.04,16.6,.04h47.94c0-30.57-.18-31.66-9.95-33.47l-29.49-5.79,.36-5.79c15.38,1.27,30.75,2.53,46.13,3.98V110.69c-15.38,1.63-30.75,3.44-46.13,5.07l-.36-5.79,29.31-6.51c10.13-2.17,10.13-2.89,10.13-32.56H18.59c-7.29,0-13.42,0-18.59,.04v59.82H157.28V42.45c-4.4,4.88-8.44,13.39-13.14,27.59Z"/>
  </svg>
);
const LogoWordmarkWhite = ({ height = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 165.66 76.88" height={height} style={{display:"block"}}>
    <g fill="#fff">
      <path d="M26.37,35.08H6.96v-3.22l4.15-.58c2.81-.53,2.92-.64,2.92-13.1V3.33c-8.36,0-8.83,.06-9.47,3.04l-1.87,9.12-2.69-.12C.35,10.23,.7,5.15,1.05,0H31.87c.47,5.15,.94,10.23,1.4,15.38l-2.69,.12-2.1-9.06c-.7-3.04-.99-3.1-9.18-3.1v13.21c0,14.09,0,14.21,3.16,14.79l3.92,.53v3.22Z"/>
      <path d="M41.75,3.57l-4.15-.41V0h16.14V3.16l-3.98,.47c-1.46,.18-1.46,.76-1.46,12.81,0,14.62,.06,14.97,1.29,15.09l4.15,.35v3.22h-16.14v-3.22l3.98-.47c1.46-.12,1.46-.58,1.46-12.75,0-14.62-.06-14.97-1.29-15.09Z"/>
      <path d="M69.59,31.81c11.17-.06,11.99-1.05,12.51-3.8l1.58-8.77h3.1c-.64,5.55-1.23,11.34-1.34,15.85h-26.37v-3.22l3.74-.35c1.46-.12,1.52-.76,1.52-12.86,0-14.56-.12-14.97-1.29-15.09l-4.15-.41V0h16.84V3.16l-4.91,.47c-1.11,.18-1.23,.88-1.23,12.81v15.38Z"/>
      <path d="M112.92,35.08h-19.41v-3.22l4.15-.58c2.81-.53,2.92-.64,2.92-13.1V3.33c-8.36,0-8.83,.06-9.47,3.04l-1.87,9.12-2.69-.12c.35-5.15,.7-10.23,1.05-15.38h30.81c.47,5.15,.94,10.23,1.4,15.38l-2.69,.12-2.1-9.06c-.7-3.04-.99-3.1-9.18-3.1v13.21c0,14.09,0,14.21,3.16,14.79l3.92,.53v3.22Z"/>
      <path d="M26.43,42.15c-.23,2.98-.47,6.08-.64,9.12h-2.92l-.23-2.05c-.47-4.68-2.4-5.61-7.54-5.61-4.5,0-7.13,1.99-7.13,5.2,0,2.86,1.93,4.91,9,7.25,8.36,2.81,11.34,5.2,11.34,9.76,0,6.2-5.15,11.05-15.26,11.05-4.62,0-8.54-1.52-10.52-2.75,.18-2.92,.35-5.85,.47-8.77h2.92l.18,2.1c.41,4.5,3.57,5.73,9.76,5.73,5.61,0,7.83-2.05,7.83-5.03,0-3.16-1.87-5.09-10.41-7.84-7.31-2.22-10.06-5.09-10.06-9.06,0-5.91,5.15-10.58,13.16-10.58,4.85,0,8.01,.88,10.06,1.46Z"/>
      <path d="M61.75,59.57c-2.92-.06-5.79-.06-8.83-.06-3.22,0-6.2,0-9.24,.06,0,12.75,.12,13.04,1.29,13.16l4.15,.35v3.22h-16.14v-3.22l3.98-.47c1.46-.12,1.46-.58,1.46-12.75,0-14.62-.06-14.97-1.29-15.09l-4.15-.41v-3.16h16.14v3.16l-3.98,.47c-1.46,.18-1.46,.76-1.46,11.81,3.04,.12,6.02,.12,9.24,.12,3.04,0,5.91,0,8.83-.12,0-11.46-.18-11.75-1.29-11.87l-4.15-.41v-3.16h16.14v3.16l-3.98,.47c-1.46,.18-1.46,.76-1.46,12.81,0,14.62,.06,14.97,1.29,15.09l4.15,.35v3.22h-16.14v-3.22l3.98-.47c1.46-.12,1.46-.58,1.46-12.75v-.29Z"/>
      <path d="M81.75,44.78l-4.15-.41v-3.16h16.14v3.16l-3.98,.47c-1.46,.18-1.46,.76-1.46,12.81,0,14.62,.06,14.97,1.29,15.09l4.15,.35v3.22h-16.14v-3.22l3.98-.47c1.46-.12,1.46-.58,1.46-12.75,0-14.62-.06-14.97-1.29-15.09Z"/>
      <path d="M116.6,76.29h-17.6v-3.22l4.33-.47c.88-.12,.99-.76,.99-13.8s-.06-13.92-1.34-14.03l-4.09-.41v-3.16h28.59c.29,3.74,.53,8.07,.88,12.22h-2.92l-.82-4.91c-.7-4.03-.88-4.03-15.14-4.03-.12,2.22-.12,6.26-.12,13.51,8.65,0,8.83-.18,9.3-2.34l.35-2.75h1.93c.29,4.5,.47,9.06,.76,13.57h-1.93l-.64-3.04c-.7-2.51-1.11-2.46-9.76-2.46,.06,11.46,.18,11.69,1.58,11.81l5.67,.29v3.22Zm-6.96-33.97l.29-.88c-.12,.29-.18,.53-.29,.88Z"/>
      <path d="M158.76,76.29h-19.41v-3.22l4.15-.58c2.81-.53,2.92-.64,2.92-13.1v-14.85c-8.36,0-8.83,.06-9.47,3.04l-1.87,9.12-2.69-.12c.35-5.15,.7-10.23,1.05-15.38h30.81c.47,5.15,.94,10.23,1.4,15.38l-2.69,.12-2.1-9.06c-.7-3.04-.99-3.1-9.18-3.1v13.21c0,14.09,0,14.21,3.16,14.79l3.92,.53v3.22Z"/>
    </g>
  </svg>
);
const LogoPrimaryWhite = ({ height = 100 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 157.28 205.5" height={height} style={{display:"block"}}>
    <g fill="#fff">
      <path d="M48.56,178.77c-.18,2.29-.36,4.68-.49,7.02h-2.25l-.18-1.57c-.36-3.6-1.84-4.32-5.8-4.32-3.46,0-5.49,1.53-5.49,4,0,2.2,1.48,3.78,6.93,5.58,6.43,2.16,8.73,4,8.73,7.51,0,4.77-3.96,8.5-11.74,8.5-3.55,0-6.57-1.17-8.1-2.11,.14-2.25,.27-4.5,.36-6.75h2.25l.14,1.62c.31,3.46,2.74,4.41,7.51,4.41,4.32,0,6.03-1.57,6.03-3.87,0-2.43-1.44-3.92-8.01-6.03-5.62-1.71-7.74-3.92-7.74-6.97,0-4.54,3.96-8.14,10.12-8.14,3.73,0,6.16,.67,7.74,1.12Z"/>
      <path d="M75.74,192.18c-2.25-.05-4.45-.05-6.79-.05-2.47,0-4.77,0-7.11,.05,0,9.81,.09,10.03,.99,10.12l3.19,.27v2.47h-12.42v-2.47l3.06-.36c1.12-.09,1.12-.45,1.12-9.81,0-11.25-.04-11.52-.99-11.61l-3.19-.32v-2.43h12.42v2.43l-3.06,.36c-1.12,.14-1.12,.58-1.12,9.09,2.34,.09,4.63,.09,7.11,.09,2.34,0,4.54,0,6.79-.09,0-8.82-.13-9.04-.99-9.13l-3.2-.32v-2.43h12.42v2.43l-3.06,.36c-1.12,.14-1.12,.58-1.12,9.85,0,11.25,.04,11.52,.99,11.61l3.19,.27v2.47h-12.42v-2.47l3.06-.36c1.12-.09,1.12-.45,1.12-9.81v-.22Z"/>
      <path d="M91.13,180.79l-3.19-.32v-2.43h12.42v2.43l-3.06,.36c-1.12,.14-1.12,.58-1.12,9.85,0,11.25,.04,11.52,.99,11.61l3.19,.27v2.47h-12.42v-2.47l3.06-.36c1.12-.09,1.12-.45,1.12-9.81,0-11.25-.04-11.52-.99-11.61Z"/>
      <path d="M117.95,205.05h-13.54v-2.47l3.33-.36c.68-.09,.77-.58,.77-10.62s-.04-10.71-1.03-10.8l-3.15-.32v-2.43h22c.22,2.88,.4,6.21,.67,9.4h-2.25l-.63-3.78c-.54-3.1-.67-3.1-11.65-3.1-.09,1.71-.09,4.81-.09,10.39,6.66,0,6.79-.14,7.15-1.8l.27-2.11h1.49c.22,3.46,.36,6.97,.58,10.44h-1.49l-.49-2.34c-.54-1.93-.85-1.89-7.51-1.89,.04,8.82,.14,9,1.21,9.09l4.36,.23v2.47Zm-5.35-26.14l.23-.67c-.09,.22-.14,.41-.23,.67Z"/>
      <path d="M150.4,205.05h-14.94v-2.47l3.2-.45c2.16-.41,2.25-.5,2.25-10.08v-11.43c-6.43,0-6.79,.05-7.29,2.34l-1.44,7.02-2.07-.09c.27-3.96,.54-7.87,.81-11.83h23.71c.36,3.96,.72,7.87,1.08,11.83l-2.07,.09-1.62-6.97c-.54-2.34-.76-2.39-7.06-2.39v10.17c0,10.84,0,10.93,2.43,11.38l3.01,.41v2.47Z"/>
    </g>
    <path fill="#fff" d="M144.14,107.45c-6.77,20.85-15.36,31.09-28.89,31.09-17.19,0-30.72-14.08-30.72-38.4,0-15.18,3.29-24.69,5.12-30.54,8.96,.73,18.29,1.1,27.61,1.65v6.22l-7.13,.73c-16.46,1.65-19.02,8.23-19.02,25.42,0,15.54,7.31,24.87,18.84,24.87,10.06,0,17.19-6.4,24.5-28.16,7.14-20.56,13.24-31.46,22.84-35.04v-27.87H0v60c4.69,.03,10.17,.04,16.6,.04h47.94c0-30.57-.18-31.66-9.95-33.47l-29.49-5.79,.36-5.79c15.38,1.27,30.75,2.53,46.13,3.98v91.72c-15.38,1.63-30.75,3.44-46.13,5.07l-.36-5.79,29.31-6.51c10.13-2.17,10.13-2.89,10.13-32.56H18.59c-7.29,0-13.42,0-18.59,.04v59.82H157.28V79.86c-4.4,4.88-8.44,13.39-13.14,27.59Z"/>
    <g fill="#fff">
      <path d="M21.91,27H6.97v-2.47l3.2-.45c2.16-.4,2.25-.5,2.25-10.08V2.56c-6.43,0-6.79,.04-7.29,2.34l-1.44,7.02-2.07-.09c.27-3.96,.54-7.87,.81-11.83H26.14c.36,3.96,.72,7.87,1.08,11.83l-2.07,.09-1.62-6.97c-.54-2.34-.76-2.39-7.06-2.39V12.73c0,10.84,0,10.93,2.43,11.38l3.01,.41v2.47Z"/>
      <path d="M33.75,2.74l-3.19-.31V0h12.42V2.43l-3.06,.36c-1.12,.14-1.12,.58-1.12,9.85,0,11.25,.04,11.52,.99,11.61l3.19,.27v2.47h-12.42v-2.47l3.06-.36c1.12-.09,1.12-.45,1.12-9.81,0-11.25-.05-11.52-.99-11.61Z"/>
      <path d="M55.17,24.48c8.59-.05,9.22-.81,9.63-2.93l1.21-6.75h2.39c-.5,4.27-.95,8.73-1.03,12.19h-20.29v-2.47l2.88-.27c1.12-.09,1.17-.58,1.17-9.9,0-11.2-.09-11.52-.99-11.61l-3.19-.31V0h12.96V2.43l-3.78,.36c-.85,.14-.95,.68-.95,9.85v11.83Z"/>
      <path d="M87.61,27h-14.94v-2.47l3.2-.45c2.16-.4,2.25-.5,2.25-10.08V2.56c-6.43,0-6.79,.04-7.29,2.34l-1.44,7.02-2.07-.09c.27-3.96,.54-7.87,.81-11.83h23.71c.36,3.96,.72,7.87,1.08,11.83l-2.07,.09-1.62-6.97c-.54-2.34-.76-2.39-7.06-2.39V12.73c0,14.09,0,10.93,2.43,11.38l3.01,.41v2.47Z"/>
    </g>
  </svg>
);

// ── Default Data ──────────────────────────────────────────────────────────────

// Scope item types — saved list, user can add more
const DEFAULT_ITEM_TYPES = [
  "Handrail / Guardrail",
  "Stair",
  "Fireplace",
  "Door",
  "Architectural Built In",
  "Sculpture",
  "Kinetic Piece",
];

// Labor: categories with a single rate + task list (tasks are descriptive labels only)
const DEFAULT_LABOR_CATEGORIES = [
  {
    id: "cat1", name: "Project Management", rate: 90,
    tasks: ["Client Communication","Scheduling","Procurement","Site Survey","Bidding"],
  },
  {
    id: "cat2", name: "Design", rate: 100,
    tasks: ["Concept / Sketching","CAD Drafting","Shop Drawings","3D Modeling","Engineering Review"],
  },
  {
    id: "cat3", name: "Fabrication", rate: 70,
    tasks: ["Cut","Drill","Bend / Form","Fit Up","Weld — MIG","Weld — TIG","Blend / Grind","Polish","Layout","Assembly"],
  },
  {
    id: "cat4", name: "Install", rate: 80,
    tasks: ["Field Measure","Anchor / Core Drill","Set / Plumb","Field Weld","Touch Up","Final Inspection"],
  },
  {
    id: "cat5", name: "Finishing", rate: 62,
    tasks: ["Surface Prep","Prime","Paint","Powder Coat Prep","Patina / Oxidize","Clear Coat","Wax / Seal"],
  },
];

const DEFAULT_MATERIALS = [
  // ── SQUARE TUBE (A500 / A36) ──────────────────────────────────────────────────
  { id:"sq01", category:"Square Tube", name:'3/4" × 3/4" Sq Tube 16ga', priceLF:0.84, priceLB:1.02, priceEA:16.8 },
  { id:"sq02", category:"Square Tube", name:'1" × 1" Sq Tube 16ga', priceLF:1.12, priceLB:1.02, priceEA:22.4 },
  { id:"sq03", category:"Square Tube", name:'1" × 1" Sq Tube 11ga', priceLF:1.62, priceLB:1.02, priceEA:32.4 },
  { id:"sq04", category:"Square Tube", name:'1.5" × 1.5" Sq Tube 16ga', priceLF:1.73, priceLB:1.02, priceEA:34.6 },
  { id:"sq05", category:"Square Tube", name:'1.5" × 1.5" Sq Tube 11ga', priceLF:2.55, priceLB:1.02, priceEA:51.0 },
  { id:"sq06", category:"Square Tube", name:'1.5" × 1.5" Sq Tube 3/16"', priceLF:3.47, priceLB:1.02, priceEA:69.4 },
  { id:"sq07", category:"Square Tube", name:'2" × 2" Sq Tube 16ga', priceLF:2.35, priceLB:1.02, priceEA:47.0 },
  { id:"sq08", category:"Square Tube", name:'2" × 2" Sq Tube 11ga', priceLF:3.57, priceLB:1.02, priceEA:71.4 },
  { id:"sq09", category:"Square Tube", name:'2" × 2" Sq Tube 3/16"', priceLF:4.8, priceLB:1.02, priceEA:96.0 },
  { id:"sq10", category:"Square Tube", name:'2" × 2" Sq Tube 1/4"', priceLF:6.22, priceLB:1.02, priceEA:124.4 },
  { id:"sq11", category:"Square Tube", name:'2.5" × 2.5" Sq Tube 11ga', priceLF:4.49, priceLB:1.02, priceEA:89.8 },
  { id:"sq12", category:"Square Tube", name:'2.5" × 2.5" Sq Tube 3/16"', priceLF:6.02, priceLB:1.02, priceEA:120.4 },
  { id:"sq13", category:"Square Tube", name:'2.5" × 2.5" Sq Tube 1/4"', priceLF:7.86, priceLB:1.02, priceEA:157.2 },
  { id:"sq14", category:"Square Tube", name:'3" × 3" Sq Tube 11ga', priceLF:5.41, priceLB:1.02, priceEA:108.2 },
  { id:"sq15", category:"Square Tube", name:'3" × 3" Sq Tube 3/16"', priceLF:7.24, priceLB:1.02, priceEA:144.8 },
  { id:"sq16", category:"Square Tube", name:'3" × 3" Sq Tube 1/4"', priceLF:9.49, priceLB:1.02, priceEA:189.8 },
  { id:"sq17", category:"Square Tube", name:'4" × 4" Sq Tube 3/16"', priceLF:9.69, priceLB:1.02, priceEA:193.8 },
  { id:"sq18", category:"Square Tube", name:'4" × 4" Sq Tube 1/4"', priceLF:12.74, priceLB:1.02, priceEA:254.8 },

  // ── RECTANGULAR TUBE (A500 / A36) ────────────────────────────────────────────
  { id:"rt01", category:"Rect Tube", name:'1" × 1/2" Rect Tube 16ga', priceLF:0.82, priceLB:1.02, priceEA:16.4 },
  { id:"rt02", category:"Rect Tube", name:'1" × 2" Rect Tube 11ga', priceLF:2.65, priceLB:1.02, priceEA:53.0 },
  { id:"rt03", category:"Rect Tube", name:'1" × 3" Rect Tube 11ga', priceLF:3.57, priceLB:1.02, priceEA:71.4 },
  { id:"rt04", category:"Rect Tube", name:'1.5" × 3" Rect Tube 11ga', priceLF:4.39, priceLB:1.02, priceEA:87.8 },
  { id:"rt05", category:"Rect Tube", name:'2" × 3" Rect Tube 11ga', priceLF:5.2, priceLB:1.02, priceEA:104.0 },
  { id:"rt06", category:"Rect Tube", name:'2" × 3" Rect Tube 3/16"', priceLF:6.94, priceLB:1.02, priceEA:138.8 },
  { id:"rt07", category:"Rect Tube", name:'2" × 4" Rect Tube 3/16"', priceLF:8.47, priceLB:1.02, priceEA:169.4 },
  { id:"rt08", category:"Rect Tube", name:'2" × 4" Rect Tube 1/4"', priceLF:11.01, priceLB:1.02, priceEA:220.2 },
  { id:"rt09", category:"Rect Tube", name:'3" × 5" Rect Tube 3/16"', priceLF:11.53, priceLB:1.02, priceEA:230.6 },
  { id:"rt10", category:"Rect Tube", name:'3" × 6" Rect Tube 1/4"', priceLF:16.83, priceLB:1.02, priceEA:336.6 },

  // ── ROUND TUBE (A513 ERW) ────────────────────────────────────────────────────
  { id:"ro01", category:"Round Tube", name:'1/2" OD Round Tube 16ga', priceLF:0.72, priceLB:1.05, priceEA:14.4 },
  { id:"ro02", category:"Round Tube", name:'3/4" OD Round Tube 16ga', priceLF:0.96, priceLB:1.05, priceEA:19.2 },
  { id:"ro03", category:"Round Tube", name:'1" OD Round Tube 16ga', priceLF:1.31, priceLB:1.05, priceEA:26.2 },
  { id:"ro04", category:"Round Tube", name:'1" OD Round Tube 11ga', priceLF:1.97, priceLB:1.05, priceEA:39.4 },
  { id:"ro05", category:"Round Tube", name:'1.5" OD Round Tube 16ga', priceLF:1.97, priceLB:1.05, priceEA:39.4 },
  { id:"ro06", category:"Round Tube", name:'1.5" OD Round Tube 11ga', priceLF:2.97, priceLB:1.05, priceEA:59.4 },
  { id:"ro07", category:"Round Tube", name:'2" OD Round Tube 16ga', priceLF:2.65, priceLB:1.05, priceEA:53.0 },
  { id:"ro08", category:"Round Tube", name:'2" OD Round Tube 11ga', priceLF:3.97, priceLB:1.05, priceEA:79.4 },
  { id:"ro09", category:"Round Tube", name:'2.5" OD Round Tube 11ga', priceLF:4.97, priceLB:1.05, priceEA:99.4 },
  { id:"ro10", category:"Round Tube", name:'3" OD Round Tube 11ga', priceLF:5.97, priceLB:1.05, priceEA:119.4 },
  { id:"ro11", category:"Round Tube", name:'4" OD Round Tube 3/16"', priceLF:10.18, priceLB:1.05, priceEA:203.6 },

  // ── PIPE (A53 Grade B, Sch 40) ───────────────────────────────────────────────
  { id:"pi01", category:"Pipe", name:'3/4" NPS Pipe Sch 40', priceLF:1.68, priceLB:1.03, priceEA:33.6 },
  { id:"pi02", category:"Pipe", name:'1" NPS Pipe Sch 40', priceLF:2.37, priceLB:1.03, priceEA:47.4 },
  { id:"pi03", category:"Pipe", name:'1.25" NPS Pipe Sch 40', priceLF:3.2, priceLB:1.03, priceEA:64.0 },
  { id:"pi04", category:"Pipe", name:'1.5" NPS Pipe Sch 40', priceLF:3.71, priceLB:1.03, priceEA:74.2 },
  { id:"pi05", category:"Pipe", name:'2" NPS Pipe Sch 40', priceLF:5.36, priceLB:1.03, priceEA:107.2 },
  { id:"pi06", category:"Pipe", name:'2.5" NPS Pipe Sch 40', priceLF:7.53, priceLB:1.03, priceEA:150.6 },
  { id:"pi07", category:"Pipe", name:'3" NPS Pipe Sch 40', priceLF:9.37, priceLB:1.03, priceEA:187.4 },
  { id:"pi08", category:"Pipe", name:'4" NPS Pipe Sch 40', priceLF:13.85, priceLB:1.03, priceEA:277.0 },

  // ── FLAT BAR (A36, hot-rolled) ───────────────────────────────────────────────
  { id:"fb01", category:"Flat Bar", name:'1/8" × 1" Flat Bar', priceLF:0.46, priceLB:0.82, priceEA:9.2 },
  { id:"fb02", category:"Flat Bar", name:'1/8" × 1.5" Flat Bar', priceLF:0.69, priceLB:0.82, priceEA:13.8 },
  { id:"fb03", category:"Flat Bar", name:'1/8" × 2" Flat Bar', priceLF:0.92, priceLB:0.82, priceEA:18.4 },
  { id:"fb04", category:"Flat Bar", name:'1/8" × 3" Flat Bar', priceLF:1.38, priceLB:0.82, priceEA:27.6 },
  { id:"fb05", category:"Flat Bar", name:'3/16" × 1" Flat Bar', priceLF:0.69, priceLB:0.82, priceEA:13.8 },
  { id:"fb06", category:"Flat Bar", name:'3/16" × 1.5" Flat Bar', priceLF:1.04, priceLB:0.82, priceEA:20.8 },
  { id:"fb07", category:"Flat Bar", name:'3/16" × 2" Flat Bar', priceLF:1.38, priceLB:0.82, priceEA:27.6 },
  { id:"fb08", category:"Flat Bar", name:'3/16" × 3" Flat Bar', priceLF:2.07, priceLB:0.82, priceEA:41.4 },
  { id:"fb09", category:"Flat Bar", name:'1/4" × 1" Flat Bar', priceLF:0.92, priceLB:0.82, priceEA:18.4 },
  { id:"fb10", category:"Flat Bar", name:'1/4" × 1.5" Flat Bar', priceLF:1.38, priceLB:0.82, priceEA:27.6 },
  { id:"fb11", category:"Flat Bar", name:'1/4" × 2" Flat Bar', priceLF:1.84, priceLB:0.82, priceEA:36.8 },
  { id:"fb12", category:"Flat Bar", name:'1/4" × 3" Flat Bar', priceLF:2.76, priceLB:0.82, priceEA:55.2 },
  { id:"fb13", category:"Flat Bar", name:'1/4" × 4" Flat Bar', priceLF:3.67, priceLB:0.82, priceEA:73.4 },
  { id:"fb14", category:"Flat Bar", name:'3/8" × 2" Flat Bar', priceLF:2.76, priceLB:0.82, priceEA:55.2 },
  { id:"fb15", category:"Flat Bar", name:'3/8" × 3" Flat Bar', priceLF:4.14, priceLB:0.82, priceEA:82.8 },
  { id:"fb16", category:"Flat Bar", name:'1/2" × 2" Flat Bar', priceLF:3.67, priceLB:0.82, priceEA:73.4 },
  { id:"fb17", category:"Flat Bar", name:'1/2" × 3" Flat Bar', priceLF:5.51, priceLB:0.82, priceEA:110.2 },

  // ── ROUND BAR (A36, hot-rolled) ──────────────────────────────────────────────
  { id:"rb01", category:"Round Bar", name:'1/2" Round Bar', priceLF:0.57, priceLB:0.85, priceEA:11.4 },
  { id:"rb02", category:"Round Bar", name:'5/8" Round Bar', priceLF:0.89, priceLB:0.85, priceEA:17.8 },
  { id:"rb03", category:"Round Bar", name:'3/4" Round Bar', priceLF:1.28, priceLB:0.85, priceEA:25.6 },
  { id:"rb04", category:"Round Bar", name:'7/8" Round Bar', priceLF:1.75, priceLB:0.85, priceEA:35.0 },
  { id:"rb05", category:"Round Bar", name:'1" Round Bar', priceLF:2.28, priceLB:0.85, priceEA:45.6 },
  { id:"rb06", category:"Round Bar", name:'1.25" Round Bar', priceLF:3.57, priceLB:0.85, priceEA:71.4 },
  { id:"rb07", category:"Round Bar", name:'1.5" Round Bar', priceLF:5.14, priceLB:0.85, priceEA:102.8 },
  { id:"rb08", category:"Round Bar", name:'2" Round Bar', priceLF:9.14, priceLB:0.85, priceEA:182.8 },

  // ── ANGLE (A36, equal leg) ───────────────────────────────────────────────────
  { id:"an01", category:"Angle", name:'L 1" × 1" × 1/8"', priceLF:0.82, priceLB:0.82, priceEA:16.4 },
  { id:"an02", category:"Angle", name:'L 1.5" × 1.5" × 1/8"', priceLF:1.24, priceLB:0.82, priceEA:24.8 },
  { id:"an03", category:"Angle", name:'L 1.5" × 1.5" × 3/16"', priceLF:1.84, priceLB:0.82, priceEA:36.8 },
  { id:"an04", category:"Angle", name:'L 2" × 2" × 1/8"', priceLF:1.66, priceLB:0.82, priceEA:33.2 },
  { id:"an05", category:"Angle", name:'L 2" × 2" × 3/16"', priceLF:2.46, priceLB:0.82, priceEA:49.2 },
  { id:"an06", category:"Angle", name:'L 2" × 2" × 1/4"', priceLF:3.28, priceLB:0.82, priceEA:65.6 },
  { id:"an07", category:"Angle", name:'L 2.5" × 2.5" × 3/16"', priceLF:3.08, priceLB:0.82, priceEA:61.6 },
  { id:"an08", category:"Angle", name:'L 2.5" × 2.5" × 1/4"', priceLF:4.1, priceLB:0.82, priceEA:82.0 },
  { id:"an09", category:"Angle", name:'L 3" × 3" × 3/16"', priceLF:3.69, priceLB:0.82, priceEA:73.8 },
  { id:"an10", category:"Angle", name:'L 3" × 3" × 1/4"', priceLF:4.92, priceLB:0.82, priceEA:98.4 },
  { id:"an11", category:"Angle", name:'L 3" × 3" × 3/8"', priceLF:7.3, priceLB:0.82, priceEA:146.0 },
  { id:"an12", category:"Angle", name:'L 4" × 4" × 1/4"', priceLF:6.56, priceLB:0.82, priceEA:131.2 },
  { id:"an13", category:"Angle", name:'L 4" × 4" × 3/8"', priceLF:9.76, priceLB:0.82, priceEA:195.2 },

  // ── SHEET (A36/A1011, hot-rolled) ────────────────────────────────────────────
  { id:"sh01", category:"Sheet", name:'Sheet 10ga (0.135")', priceSF:7.02, priceLB:0.78, priceEA:0 },
  { id:"sh02", category:"Sheet", name:'Sheet 11ga (0.120")', priceSF:6.24, priceLB:0.78, priceEA:0 },
  { id:"sh03", category:"Sheet", name:'Sheet 12ga (0.105")', priceSF:5.46, priceLB:0.78, priceEA:0 },
  { id:"sh04", category:"Sheet", name:'Sheet 14ga (0.075")', priceSF:3.9, priceLB:0.78, priceEA:0 },
  { id:"sh05", category:"Sheet", name:'Sheet 16ga (0.060")', priceSF:3.12, priceLB:0.78, priceEA:0 },

  // ── PLATE (A36, hot-rolled) ──────────────────────────────────────────────────
  { id:"pl01", category:"Plate", name:'Plate 3/16" (0.188")', priceSF:11.52, priceLB:0.8, priceEA:0 },
  { id:"pl02", category:"Plate", name:'Plate 1/4" (0.250")', priceSF:15.36, priceLB:0.8, priceEA:0 },
  { id:"pl03", category:"Plate", name:'Plate 3/8" (0.375")', priceSF:23.04, priceLB:0.8, priceEA:0 },
  { id:"pl04", category:"Plate", name:'Plate 1/2" (0.500")', priceSF:30.72, priceLB:0.8, priceEA:0 },
  { id:"pl05", category:"Plate", name:'Plate 5/8" (0.625")', priceSF:38.4, priceLB:0.8, priceEA:0 },
  { id:"pl06", category:"Plate", name:'Plate 3/4" (0.750")', priceSF:46.08, priceLB:0.8, priceEA:0 },
  { id:"pl07", category:"Plate", name:'Plate 1" (1.000")', priceSF:61.44, priceLB:0.8, priceEA:0 },

  // ── HARDWARE ─────────────────────────────────────────────────────────────────
  { id:"hw01", category:"Hardware", name:'Post Base Plate 4"×4"', priceLF:0, priceLB:0, priceEA:8.75 },
  { id:"hw02", category:"Hardware", name:'Post Base Plate 6"×6"', priceLF:0, priceLB:0, priceEA:14.5 },
  { id:"hw03", category:"Hardware", name:'Lag Screw 1/2" × 3"', priceLF:0, priceLB:0, priceEA:0.85 },
  { id:"hw04", category:"Hardware", name:'Lag Screw 1/2" × 4"', priceLF:0, priceLB:0, priceEA:1.05 },
  { id:"hw05", category:"Hardware", name:'Wedge Anchor 3/8" × 3"', priceLF:0, priceLB:0, priceEA:0.95 },
  { id:"hw06", category:"Hardware", name:'Wedge Anchor 1/2" × 3.75"', priceLF:0, priceLB:0, priceEA:1.25 },
  { id:"hw07", category:"Hardware", name:'Hex Bolt 1/2" × 1.5"', priceLF:0, priceLB:0, priceEA:0.55 },
  { id:"hw08", category:"Hardware", name:'Stainless Cable Assy 1/8"', priceLF:0, priceLB:0, priceEA:22.0 },
  { id:"hw09", category:"Hardware", name:'Stainless Cable Assy 3/16"', priceLF:0, priceLB:0, priceEA:28.5 },

  // ── INSTALL MATERIALS ─────────────────────────────────────────────────────────
  { id:"im01", category:"Install Materials", name:'Concrete Anchor — 3/8"', priceLF:0, priceLB:0, priceEA:2.4 },
  { id:"im02", category:"Install Materials", name:'Concrete Anchor — 1/2"', priceLF:0, priceLB:0, priceEA:3.2 },
  { id:"im03", category:"Install Materials", name:'Threaded Rod 1/2" × 12"', priceLF:0, priceLB:0, priceEA:3.75 },
  { id:"im04", category:"Install Materials", name:'Threaded Rod 5/8" × 12"', priceLF:0, priceLB:0, priceEA:5.25 },
];

const DEFAULT_FINISHES = [
  "Powder Coated — Stock Color",
  "Powder Coated — Custom Color",
  "Paint",
  "Patina with Wax",
  "Patina with Oil & Wax",
  "Hardwax Oil",
  "Lacquer",
  "Raw / Mill Finish",
  "Hot-Dip Galvanized",
];

const DEFAULT_EXCLUSION_OPTIONS = [
  "Engineering",
  "Permitting",
  "Blocking",
  "Site Finishing",
  "Lifting Equipment",
  "Electrical",
  "Lighting",
  "Glass",
  "Wood Components",
  "Concrete Work",
  "Painting by Others",
  "Delivery",
];

const ESTIMATORS   = [];
const STATUS_LIST  = ["Draft","Sent","Won","Lost"];
const DEFAULT_CLIENTS = [];

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = n => `$${Number(n||0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
const uid = () => Math.random().toString(36).slice(2,9);

// Auto-number: position index → "01.0", "02.0", etc.
const itemNum = (idx, suffix = 0) =>
  String(idx + 1).padStart(2, "0") + "." + suffix;

const blankScopeItem = () => ({
  id: uid(),
  name: "",
  description: "",     // brief item description shown on proposal
  type: "",
  finish: "",
  exclusions: [],
  qty: "",             // LF for handrail/guardrail, riser count for stair
  // Fabrication
  materialLines: [],
  laborLines: [],
  // Install (always sub-item .1)
  installMaterialLines: [],
  installLaborLines: [],
  // Alternates/mods (.2, .3, …)
  alternates: [],
  notes: "",
  installNotes: "",
});

const blankAlternate = (altIdx) => ({
  id: uid(),
  label: "",   // e.g. "Powder coat option"
  materialLines: [],
  laborLines: [],
  notes: "",
});

// Get the unit price from a material given the chosen unit on the line
const matUnitPrice = (m, unit) => {
  if (!m) return 0;
  if (unit === "LB")   return m.priceLB || 0;
  if (unit === "EA")   return m.priceEA || 0;
  if (unit === "SqFt") return m.priceSF || 0;
  return m.priceLF || m.priceSF || 0; // LF default
};

// Returns { base, install, alts[], total }
const calcItem = (item, mats, laborCats, wastePct, ovhd, mkup) => {
  const calcLines = (matLines, labLines) => {
    const rawMat = matLines.reduce((s,l) => {
      if (l.custom) return s + (Number(l.customCost)||0) * Number(l.qty);
      const m = mats.find(x => x.id === l.materialId);
      const price = l.customCost != null ? Number(l.customCost) : matUnitPrice(m, l.unit);
      return s + price * Number(l.qty);
    }, 0);
    const matW  = rawMat * (1 + Number(wastePct) / 100);
    const labor = labLines.reduce((s,l) => {
      const cat = laborCats.find(c => c.id === l.categoryId);
      return s + (cat ? cat.rate * Number(l.hrs) : 0);
    }, 0);
    const sub    = matW + labor;
    const ovAmt  = sub * (Number(ovhd) / 100);
    const preMarkup = sub + ovAmt;
    const mkupFrac  = Math.min(Number(mkup) / 100, 0.9999); // guard against 100%
    const mkAmt  = Math.round((preMarkup / (1 - mkupFrac) - preMarkup) / 10) * 10;
    return { rawMat, matW, labor, sub, ovAmt, mkAmt, total: sub + ovAmt + mkAmt };
  };

  const base    = calcLines(item.materialLines || [], item.laborLines || []);
  const install = calcLines(item.installMaterialLines || [], item.installLaborLines || []);
  const alts    = (item.alternates || []).map(a =>
    calcLines(a.materialLines || [], a.laborLines || [])
  );
  const total = base.total + install.total + alts.reduce((s,a)=>s+a.total, 0);
  return { base, install, alts, total };
};

// ── Searchable Type Dropdown ──────────────────────────────────────────────────
function TypeSelect({ value, onChange, types, onAddType }) {
  const [open, setOpen]     = useState(false);
  const [query, setQuery]   = useState("");
  const ref                 = useRef(null);

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = types.filter(t => t.toLowerCase().includes(query.toLowerCase()));
  const canAdd   = query.trim() && !types.find(t => t.toLowerCase() === query.trim().toLowerCase());

  const select = t => { onChange(t); setOpen(false); setQuery(""); };
  const addNew = () => { const t = query.trim(); onAddType(t); onChange(t); setOpen(false); setQuery(""); };

  return (
    <div ref={ref} style={{position:"relative",flex:1}}>
      <div
        onClick={() => { setOpen(o => !o); setQuery(""); }}
        style={{
          background:"var(--white)", border:"1px solid var(--border2)", borderRadius:2,
          padding:"7px 10px", cursor:"pointer", display:"flex", justifyContent:"space-between",
          alignItems:"center", fontSize:12, color: value ? "var(--ink)" : "var(--ink3)",
          minWidth:0,
        }}
      >
        <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{value || "Select type…"}</span>
        <span style={{marginLeft:8, color:"var(--ink3)", fontSize:10, flexShrink:0}}>▾</span>
      </div>
      {open && (
        <div style={{
          position:"absolute", top:"calc(100% + 2px)", left:0, right:0, zIndex:50,
          background:"var(--white)", border:"1px solid var(--border2)", borderRadius:2,
          boxShadow:"0 4px 16px rgba(28,26,23,.14)", overflow:"hidden",
        }}>
          <div style={{padding:6}}>
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search or type new…"
              style={{fontSize:12, padding:"6px 8px", border:"1px solid var(--border)", borderRadius:2, width:"100%", background:"var(--cream)"}}
              onKeyDown={e => { if(e.key==="Enter"){ canAdd ? addNew() : filtered[0] && select(filtered[0]); } if(e.key==="Escape") setOpen(false); }}
            />
          </div>
          <div style={{maxHeight:180, overflowY:"auto"}}>
            {filtered.map(t => (
              <div key={t} onClick={() => select(t)} style={{
                padding:"8px 12px", fontSize:12, cursor:"pointer",
                background: t === value ? "var(--cream2)" : "transparent",
                color: t === value ? "var(--bronze)" : "var(--ink)",
              }}
              onMouseEnter={e => e.currentTarget.style.background="var(--cream)"}
              onMouseLeave={e => e.currentTarget.style.background = t===value ? "var(--cream2)" : "transparent"}
              >{t}</div>
            ))}
            {filtered.length === 0 && !canAdd && <div style={{padding:"8px 12px",fontSize:12,color:"var(--ink3)"}}>No matches</div>}
            {canAdd && (
              <div onClick={addNew} style={{
                padding:"8px 12px", fontSize:12, cursor:"pointer",
                borderTop:"1px solid var(--cream3)", color:"var(--bronze)", fontWeight:500,
              }}
              onMouseEnter={e => e.currentTarget.style.background="var(--cream)"}
              onMouseLeave={e => e.currentTarget.style.background="transparent"}
              >+ Add "{query.trim()}"</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Calc Panel ────────────────────────────────────────────────────────────────
// Chain-style calculator: each step takes the running result and applies an op.
// calc = { steps: [{id, label, value, op, roundUp}], note, unit }
//   - first step: starting value, optional roundUp
//   - subsequent steps: op ("×"|"÷"|"+"|"−"), value, optional roundUp
//   - roundUp (default true): Math.ceil applied to this step's result before passing forward
function CalcPanel({ calc, onChange, onApply, fieldLabel, fieldUnit }) {
  const steps = calc?.steps || [];
  const note  = calc?.note  || "";
  const unit  = calc?.unit  || fieldUnit || "hrs";

  const UNITS = fieldUnit === "qty"
    ? ["qty","units","pcs","LF","SqFt","LB"]
    : ["hrs","min"];

  const addStep = () => onChange({
    ...calc,
    steps: [...steps, { id: uid(), label: "", value: "", op: "×", roundUp: true }],
  });

  const updStep = (id, patch) => onChange({
    ...calc,
    steps: steps.map(s => s.id === id ? { ...s, ...patch } : s),
  });

  const delStep = id => onChange({ ...calc, steps: steps.filter(s => s.id !== id) });

  // Compute running result after each step, respecting roundUp per step
  const runningResults = steps.reduce((acc, step, i) => {
    const v = parseFloat(step.value);
    let result;
    if (i === 0) {
      result = isNaN(v) ? null : v;
    } else {
      const prev = acc[acc.length - 1];
      if (prev === null || isNaN(v)) {
        result = null;
      } else {
        if      (step.op === "÷") result = v === 0 ? null : prev / v;
        else if (step.op === "×") result = prev * v;
        else if (step.op === "+") result = prev + v;
        else if (step.op === "−") result = prev - v;
        else result = null;
      }
    }
    // Apply roundUp to this step's result
    const rounded = (result !== null && step.roundUp !== false) ? Math.ceil(result) : result;
    acc.push(rounded);
    return acc;
  }, []);

  const finalResult = runningResults.length > 0 ? runningResults[runningResults.length - 1] : null;
  const hasSteps = steps.length > 0;

  // Build readable expression string
  const exprStr = steps.map((s, i) => {
    const v   = s.value !== "" ? s.value : "?";
    const lbl = s.label ? ` (${s.label})` : "";
    const ru  = s.roundUp !== false ? " ⌈⌉" : "";
    return i === 0 ? `${v}${lbl}${ru}` : ` ${s.op} ${v}${lbl}${ru}`;
  }).join("");

  const finalValue = (() => {
    if (finalResult === null) return null;
    if (unit === "min") return +(finalResult / 60).toFixed(4);
    return +finalResult.toFixed(4);
  })();

  const fmt3 = n => n === null ? "—" : n.toLocaleString("en-US", { maximumFractionDigits: 3 });

  // Op button grid style
  const opBtnStyle = (active) => ({
    padding: "4px 8px", fontSize: 14, fontWeight: 700, borderRadius: 2, cursor: "pointer",
    border: `1px solid ${active ? "var(--bronze)" : "var(--border)"}`,
    background: active ? "var(--bronze)" : "var(--white)",
    color: active ? "var(--white)" : "var(--ink2)",
    fontFamily: "'DM Mono',monospace", lineHeight: 1.2, minWidth: 30, textAlign: "center",
  });

  return (
    <div style={{
      background: "#fafaf8", border: "1px solid var(--border)",
      borderLeft: "3px solid var(--bronze2)", borderRadius: 2,
      padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10, fontSize: 12,
    }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontSize:10, textTransform:"uppercase", letterSpacing:".1em", color:"var(--bronze)", fontWeight:600 }}>
          ∑ Calc — {fieldLabel}
        </span>
        <button className="btn-g btn-s" style={{ fontSize:11, padding:"3px 10px" }} onClick={addStep}>
          + Add Step
        </button>
      </div>

      {/* Empty state */}
      {steps.length === 0 && (
        <div style={{ color:"var(--ink3)", fontSize:11, padding:"6px 0", lineHeight:1.7 }}>
          Build a chain of steps — each step takes the previous result and applies an operation.<br/>
          <em>Example: 200 LF ÷ 0.33 (ft/picket) × 3 (ft each) = total LF of picket stock</em>
        </div>
      )}

      {/* Column headers */}
      {steps.length > 0 && (
        <div style={{ display:"grid", gridTemplateColumns:"72px 110px 1fr 28px 90px 28px", gap:6, alignItems:"center" }}>
          <div style={{fontSize:9,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink3)",fontWeight:500}}>Op</div>
          <div style={{fontSize:9,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink3)",fontWeight:500}}>Value</div>
          <div style={{fontSize:9,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink3)",fontWeight:500}}>Label / Description</div>
          <div style={{fontSize:9,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink3)",fontWeight:500,textAlign:"center"}} title="Round up (ceiling) this step's result">⌈⌉</div>
          <div style={{fontSize:9,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink3)",fontWeight:500,textAlign:"right"}}>= Running</div>
          <div/>
        </div>
      )}

      {/* Steps */}
      {steps.length > 0 && (
        <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
          {steps.map((step, i) => {
            const running = runningResults[i];
            const isFirst = i === 0;
            const roundUp = step.roundUp !== false; // default true
            return (
              <div key={step.id} style={{
                display:"grid", gridTemplateColumns:"72px 110px 1fr 28px 90px 28px",
                gap:6, alignItems:"center",
                background: i % 2 === 0 ? "transparent" : "rgba(245,242,236,.5)",
                borderRadius:2, padding:"2px 0",
              }}>

                {/* Op selector */}
                {isFirst ? (
                  <div style={{ fontSize:10, color:"var(--ink3)", textTransform:"uppercase", letterSpacing:".08em", paddingLeft:2, fontWeight:500 }}>
                    Start
                  </div>
                ) : (
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2 }}>
                    {["×","÷","+","−"].map(op => (
                      <button key={op} style={opBtnStyle(step.op === op)}
                        onClick={() => updStep(step.id, { op })}>
                        {op}
                      </button>
                    ))}
                  </div>
                )}

                {/* Value */}
                <input
                  type="number"
                  value={step.value}
                  onChange={e => updStep(step.id, { value: e.target.value })}
                  placeholder={isFirst ? "Starting value" : "Value"}
                  style={{ fontSize:13, fontFamily:"'DM Mono',monospace", fontWeight:500 }}
                />

                {/* Label */}
                <input
                  value={step.label}
                  onChange={e => updStep(step.id, { label: e.target.value })}
                  placeholder={isFirst ? "e.g. 200 LF guardrail run" : "e.g. ft per picket spacing"}
                  style={{ fontSize:12 }}
                />

                {/* Round-up checkbox */}
                <div style={{ display:"flex", justifyContent:"center", alignItems:"center" }}>
                  <input
                    type="checkbox"
                    checked={roundUp}
                    onChange={e => updStep(step.id, { roundUp: e.target.checked })}
                    title="Round up (ceiling) this step's result"
                    style={{ width:14, height:14, cursor:"pointer", accentColor:"var(--bronze)" }}
                  />
                </div>

                {/* Running result */}
                <div style={{
                  fontFamily:"'DM Mono',monospace", fontSize:12, fontWeight:600,
                  color: running !== null ? "var(--bronze)" : "var(--ink3)",
                  textAlign:"right",
                }}>
                  {running !== null
                    ? <span>{fmt3(running)}{roundUp && !Number.isInteger(running) === false ? "" : ""}</span>
                    : "?"}
                </div>

                {/* Delete */}
                <button className="btn-d" style={{ padding:"2px 6px", fontSize:11 }}
                  onClick={() => delStep(step.id)}>✕</button>
              </div>
            );
          })}
        </div>
      )}

      {/* Expression summary */}
      {steps.length > 1 && (
        <div style={{
          background:"var(--cream)", borderRadius:2, padding:"7px 10px",
          fontSize:11, fontFamily:"'DM Mono',monospace", color:"var(--ink2)",
          border:"1px solid var(--border)", lineHeight:1.7, wordBreak:"break-all",
        }}>
          <span style={{fontSize:9,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink3)",fontWeight:500,marginRight:6}}>Formula:</span>
          {exprStr}
          {finalResult !== null && (
            <span style={{ fontWeight:700, color:"var(--bronze)" }}> = {fmt3(finalResult)}</span>
          )}
        </div>
      )}

      {/* Result bar + unit + apply */}
      <div style={{
        display:"flex", alignItems:"center", gap:10,
        background:"var(--cream2)", borderRadius:2, padding:"8px 12px",
        border:"1px solid var(--border)",
      }}>
        <span style={{ fontSize:11, color:"var(--ink3)", flex:1 }}>Result:</span>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:15, fontWeight:700, color:"var(--bronze)" }}>
          {hasSteps && finalResult !== null ? fmt3(finalResult) : "—"}
        </span>
        <select
          value={unit}
          onChange={e => onChange({ ...calc, unit:e.target.value })}
          style={{ width:72, fontSize:12, padding:"4px 6px" }}
        >
          {UNITS.map(u => <option key={u}>{u}</option>)}
        </select>
        {unit === "min" && finalResult !== null && (
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"var(--ink3)", flexShrink:0 }}>
            = {(finalResult/60).toFixed(2)} hrs
          </span>
        )}
        {hasSteps && finalValue !== null && (
          <button className="btn-b btn-s" style={{ fontSize:11, padding:"5px 14px", flexShrink:0 }}
            onClick={() => onApply(finalValue)}>
            Apply {unit === "min" ? `${(finalResult/60).toFixed(2)} hrs` : `${finalValue}`}
          </button>
        )}
      </div>

      {/* Notes */}
      <div>
        <div className="fl" style={{ marginBottom:4 }}>Calc Notes</div>
        <textarea rows={2} value={note}
          onChange={e => onChange({ ...calc, note:e.target.value })}
          placeholder="Assumptions, conversions, source measurements…"
          style={{ fontSize:11, resize:"vertical", background:"var(--white)" }}
        />
      </div>
    </div>
  );
}

// ── Calc button — shows ∑ with dot if saved math exists ───────────────────────
function CalcBtn({ hasCalc, onClick, active }) {
  return (
    <button
      onClick={onClick}
      title={hasCalc ? "View saved calculation" : "Open calculator"}
      style={{
        background: active ? "var(--bronze)" : hasCalc ? "var(--cream2)" : "transparent",
        border: `1px solid ${active ? "var(--bronze)" : hasCalc ? "var(--bronze2)" : "var(--border)"}`,
        color: active ? "var(--white)" : hasCalc ? "var(--bronze)" : "var(--ink3)",
        borderRadius:2, padding:"3px 7px", fontSize:12, lineHeight:1,
        position:"relative", flexShrink:0,
      }}
    >
      ∑{hasCalc && !active && <span style={{
        position:"absolute",top:2,right:2,width:5,height:5,
        background:"var(--bronze)",borderRadius:"50%",display:"block",
      }}/>}
    </button>
  );
}

// ── Searchable material picker ────────────────────────────────────────────────
function MatPicker({ line, mats, matCategories, onUpdMat }) {
  const [search, setSearch] = useState("");
  const [open,   setOpen]   = useState(false);
  const ref = useRef(null);

  const MAT_CATS = matCategories || [];
  const q = search.toLowerCase();
  const filtered = q
    ? mats.filter(x => x.name.toLowerCase().includes(q) || x.category.toLowerCase().includes(q))
    : mats;

  // Close on outside click
  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = line.custom ? null : mats.find(x => x.id === line.materialId);
  const displayName = line.custom ? (line.customName || "Custom line") : (selected?.name || "— Select material —");

  const pick = (mat) => {
    const defaultUnit = mat.priceLF ? "LF" : mat.priceSF ? "SqFt" : mat.priceEA ? "EA" : mat.priceLB ? "LB" : "LF";
    onUpdMat(line.id, { materialId:mat.id, custom:false, customName:"", unit:defaultUnit, customCost:null });
    setSearch("");
    setOpen(false);
  };

  return (
    <div ref={ref} style={{position:"relative",minWidth:200}}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          display:"flex",alignItems:"center",justifyContent:"space-between",
          padding:"5px 8px",border:"1px solid var(--border2)",borderRadius:2,
          background:"var(--white)",cursor:"pointer",fontSize:12,gap:6,
          borderColor: open ? "var(--bronze)" : "var(--border2)",
        }}
      >
        <span style={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
          color: line.custom ? "var(--ink2)" : selected ? "var(--ink)" : "var(--ink3)"
        }}>{displayName}</span>
        <span style={{fontSize:9,color:"var(--ink3)",flexShrink:0}}>▾</span>
      </div>
      {open && (
        <div style={{
          position:"absolute",top:"100%",left:0,zIndex:999,width:320,
          background:"var(--white)",border:"1px solid var(--border2)",borderRadius:2,
          boxShadow:"0 4px 16px rgba(28,26,23,.15)",maxHeight:320,display:"flex",flexDirection:"column",
        }}>
          <div style={{padding:"6px 8px",borderBottom:"1px solid var(--cream3)"}}>
            <input
              autoFocus
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search materials…"
              style={{fontSize:12,width:"100%"}}
              onClick={e => e.stopPropagation()}
            />
          </div>
          <div style={{overflowY:"auto",flex:1}}>
            {/* Custom line option */}
            <div
              onClick={() => {
                onUpdMat(line.id, { custom:true, materialId:null, customName:"", customCost:0, unit:"LF" });
                setSearch(""); setOpen(false);
              }}
              style={{padding:"7px 10px",fontSize:12,cursor:"pointer",borderBottom:"1px solid var(--cream3)",
                color:"var(--bronze)",fontWeight:500,background:"var(--cream)"}}
            >
              + Custom line (not in library)
            </div>
            {q
              ? filtered.map(x => (
                  <div key={x.id} onClick={() => pick(x)}
                    style={{padding:"6px 10px",fontSize:12,cursor:"pointer",
                      background: x.id===line.materialId ? "var(--cream2)" : "var(--white)",
                    }}
                    onMouseEnter={e=>e.currentTarget.style.background="var(--cream)"}
                    onMouseLeave={e=>e.currentTarget.style.background= x.id===line.materialId?"var(--cream2)":"var(--white)"}
                  >
                    <span style={{color:"var(--ink3)",fontSize:10,marginRight:6}}>{x.category}</span>{x.name}
                  </div>
                ))
              : MAT_CATS.map(cat => {
                  const items = mats.filter(x => x.category === cat);
                  if (!items.length) return null;
                  return (
                    <div key={cat}>
                      <div style={{padding:"5px 10px",fontSize:10,fontWeight:600,letterSpacing:".08em",
                        textTransform:"uppercase",color:"var(--ink3)",background:"var(--cream2)",
                        borderBottom:"1px solid var(--cream3)"}}>
                        {cat}
                      </div>
                      {items.map(x => (
                        <div key={x.id} onClick={() => pick(x)}
                          style={{padding:"6px 10px 6px 16px",fontSize:12,cursor:"pointer",
                            background: x.id===line.materialId ? "var(--cream2)" : "var(--white)",
                          }}
                          onMouseEnter={e=>e.currentTarget.style.background="var(--cream)"}
                          onMouseLeave={e=>e.currentTarget.style.background= x.id===line.materialId?"var(--cream2)":"var(--white)"}
                        >{x.name}</div>
                      ))}
                    </div>
                  );
                })
            }
          </div>
        </div>
      )}
    </div>
  );
}

// ── Reusable lines editor (materials + labor in one panel) ───────────────────
function LinesEditor({ matLines, labLines, mats, laborCats, wastePct, onUpdMat, onDelMat, onAddMat,
  onUpdLab, onDelLab, onAddLab, matCategory, matCategories }) {
  const MAT_CATS = matCategories || ["Square Tube","Rect Tube","Round Tube","Pipe","Flat Bar","Round Bar","Angle","C Channel","W Beam","Sheet","Plate","Hardware","Install Materials"];
  const firstMatId = matCategory
    ? (mats.find(x=>x.category===matCategory)||mats[0]).id
    : mats[0].id;

  const [openCalc, setOpenCalc] = useState(null);
  const toggleCalc = id => setOpenCalc(c => c === id ? null : id);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      {/* Materials */}
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
          <span style={{fontSize:10,textTransform:"uppercase",letterSpacing:".1em",color:"var(--ink3)",fontWeight:500}}>Materials</span>
          <div style={{display:"flex",gap:6}}>
            <button className="btn-g btn-s" onClick={()=>onAddMat(firstMatId)}>+ Add Line</button>
          </div>
        </div>
        {matLines.length===0
          ? <div style={{padding:"8px 0",color:"var(--ink3)",fontSize:12,textAlign:"center",background:"var(--cream)",borderRadius:2}}>No materials</div>
          : <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr>{["Material","Qty","Unit","Unit Cost","Ext.","Note","∑",""].map(h=>(
                <th key={h} style={{textAlign:"left",fontSize:10,color:"var(--ink3)",padding:"5px 7px",borderBottom:"1px solid var(--border)",letterSpacing:".07em",textTransform:"uppercase",fontWeight:500}}>{h}</th>
              ))}</tr></thead>
              <tbody>{matLines.map(line=>{
                const m = line.custom ? null : mats.find(x=>x.id===line.materialId);
                const lineUnit = line.unit || (m?.priceSF ? "SqFt" : "LF");
                // Unit cost: custom override wins, then library price
                const libraryPrice = matUnitPrice(m, lineUnit);
                const unitPrice = line.customCost != null ? Number(line.customCost) : libraryPrice;
                const ext = unitPrice * Number(line.qty);
                const availUnits = line.custom
                  ? ["LF","SqFt","LB","EA"]
                  : m ? [
                      ...(m.priceLF ? ["LF"] : []),
                      ...(m.priceSF ? ["SqFt"] : []),
                      ...(m.priceLB ? ["LB"] : []),
                      ...(m.priceEA ? ["EA"] : []),
                    ] : ["LF","LB","EA"];
                const isOpen = openCalc === line.id;
                const bb = isOpen ? "none" : "1px solid var(--cream3)";
                return (
                  <Fragment key={line.id}>
                    <tr>
                      {/* Material picker */}
                      <td style={{padding:"4px 7px",borderBottom:bb,verticalAlign:"middle"}}>
                        {line.custom
                          ? <div style={{display:"flex",gap:4,alignItems:"center"}}>
                              <input
                                value={line.customName||""}
                                onChange={e=>onUpdMat(line.id,"customName",e.target.value)}
                                placeholder="Custom material name…"
                                style={{fontSize:12,minWidth:160}}
                              />
                              <button className="btn-g btn-s" style={{fontSize:10,padding:"3px 7px",flexShrink:0,whiteSpace:"nowrap"}}
                                onClick={()=>onUpdMat(line.id, { custom:false, materialId:mats[0]?.id, customName:"", customCost:null })}>
                                Library ↩
                              </button>
                            </div>
                          : <MatPicker line={line} mats={mats} matCategories={MAT_CATS} onUpdMat={onUpdMat}/>
                        }
                      </td>
                      {/* Qty */}
                      <td style={{padding:"4px 7px",borderBottom:bb,verticalAlign:"middle",width:90}}>
                        <input type="number" min="0" value={line.qty}
                          onChange={e=>onUpdMat(line.id,"qty",e.target.value)} style={{fontSize:12}}/>
                      </td>
                      {/* Unit */}
                      <td style={{padding:"4px 7px",borderBottom:bb,verticalAlign:"middle",width:72}}>
                        <select value={lineUnit} onChange={e=>onUpdMat(line.id,"unit",e.target.value)} style={{fontSize:12,width:"100%"}}>
                          {availUnits.map(u=><option key={u} value={u}>{u}</option>)}
                        </select>
                      </td>
                      {/* Unit cost — editable, shows library price as placeholder */}
                      <td style={{padding:"4px 7px",borderBottom:bb,verticalAlign:"middle",width:96}}>
                        <input
                          type="number" min="0" step="0.01"
                          value={line.customCost != null ? line.customCost : libraryPrice}
                          onChange={e => onUpdMat(line.id, "customCost", e.target.value === "" ? null : parseFloat(e.target.value)||0)}
                          style={{
                            fontSize:11,fontFamily:"'DM Mono',monospace",width:"100%",
                            color: line.customCost != null ? "var(--bronze2)" : "var(--ink3)",
                          }}
                          title={line.customCost != null ? "Custom price (overriding library)" : "Library price — edit to override"}
                        />
                      </td>
                      {/* Extended */}
                      <td style={{padding:"4px 7px",borderBottom:bb,verticalAlign:"middle",width:90}}>
                        <span style={{color:"var(--bronze)",fontWeight:600,fontFamily:"'DM Mono',monospace",fontSize:12}}>{fmt(ext)}</span>
                      </td>
                      {/* Note */}
                      <td style={{padding:"4px 7px",borderBottom:bb,verticalAlign:"middle"}}>
                        <input value={line.note||""} onChange={e=>onUpdMat(line.id,"note",e.target.value)} placeholder="Note" style={{fontSize:12}}/>
                      </td>
                      <td style={{padding:"4px 7px",borderBottom:bb,verticalAlign:"middle",width:36,textAlign:"center"}}>
                        <CalcBtn hasCalc={!!(line.calc?.steps?.length)} active={isOpen} onClick={()=>toggleCalc(line.id)}/>
                      </td>
                      <td style={{padding:"4px 7px",borderBottom:bb,verticalAlign:"middle",width:38,textAlign:"center"}}>
                        <button className="btn-d" onClick={()=>onDelMat(line.id)}>✕</button>
                      </td>
                    </tr>
                    {isOpen && (
                      <tr>
                        <td colSpan={8} style={{padding:"0 7px 10px",borderBottom:"1px solid var(--cream3)"}}>
                          <CalcPanel
                            calc={line.calc}
                            fieldLabel={line.custom ? (line.customName||"Custom") : (m?.name || "Qty")}
                            fieldUnit="qty"
                            onChange={newCalc => onUpdMat(line.id,"calc",newCalc)}
                            onApply={val => { onUpdMat(line.id,"qty",val); toggleCalc(line.id); }}
                          />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}</tbody>
            </table>
        }
      </div>

      {/* Labor */}
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
          <span style={{fontSize:10,textTransform:"uppercase",letterSpacing:".1em",color:"var(--ink3)",fontWeight:500}}>Labor</span>
          <button className="btn-g btn-s" onClick={onAddLab}>+ Add Labor</button>
        </div>
        {labLines.length===0
          ? <div style={{padding:"8px 0",color:"var(--ink3)",fontSize:12,textAlign:"center",background:"var(--cream)",borderRadius:2}}>No labor lines</div>
          : <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr>{["Category","Task","Hrs","Rate/Hr","Ext.","Note","∑",""].map(h=>(
                <th key={h} style={{textAlign:"left",fontSize:10,color:"var(--ink3)",padding:"5px 7px",borderBottom:"1px solid var(--border)",letterSpacing:".07em",textTransform:"uppercase",fontWeight:500}}>{h}</th>
              ))}</tr></thead>
              <tbody>{labLines.map(line=>{
                const isOpen = openCalc === line.id;
                return (
                  <Fragment key={line.id}>
                    <LaborLineRow line={line} laborCats={laborCats}
                      onChange={nl=>onUpdLab(line.id,nl)} onDelete={()=>onDelLab(line.id)}
                      calcOpen={isOpen} onToggleCalc={()=>toggleCalc(line.id)}/>
                    {isOpen && (
                      <tr>
                        <td colSpan={8} style={{padding:"0 7px 10px",borderBottom:"1px solid var(--cream3)"}}>
                          <CalcPanel
                            calc={line.calc}
                            fieldLabel={line.task || "Hours"}
                            fieldUnit="hrs"
                            onChange={newCalc => onUpdLab(line.id, {...line, calc: newCalc})}
                            onApply={val => { onUpdLab(line.id, {...line, hrs: val}); toggleCalc(line.id); }}
                          />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}</tbody>
            </table>
        }
      </div>
    </div>
  );
}

// ── Exclusions Editor ─────────────────────────────────────────────────────────
function ExclusionsEditor({ exclusions, onChange, exclusionOptions, onAddOption }) {
  const [customInput, setCustomInput] = useState("");

  const toggle = opt => {
    if (exclusions.includes(opt)) onChange(exclusions.filter(e => e !== opt));
    else onChange([...exclusions, opt]);
  };

  const addCustom = () => {
    const val = customInput.trim();
    if (!val) return;
    const newOpts = exclusionOptions.includes(val) ? exclusionOptions : [...exclusionOptions, val];
    onAddOption(newOpts);
    if (!exclusions.includes(val)) onChange([...exclusions, val]);
    setCustomInput("");
  };

  return (
    <div>
      <div className="fl" style={{marginBottom:8}}>Exclusions</div>
      {/* Preset chips */}
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
        {exclusionOptions.map(opt => {
          const active = exclusions.includes(opt);
          return (
            <button key={opt} onClick={()=>toggle(opt)} style={{
              padding:"4px 11px", fontSize:11, borderRadius:12,
              border: active ? "1px solid var(--bronze)" : "1px solid var(--border2)",
              background: active ? "var(--bronze)" : "var(--white)",
              color: active ? "var(--white)" : "var(--ink3)",
              cursor:"pointer", transition:"all .12s", fontWeight: active ? 500 : 400,
            }}>{opt}</button>
          );
        })}
      </div>
      {/* Active exclusions (shows selected + any custom not in preset list) */}
      {exclusions.length > 0 && (
        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>
          {exclusions.map(ex => (
            <span key={ex} style={{
              display:"flex",alignItems:"center",gap:4,
              padding:"3px 8px 3px 10px", fontSize:11, borderRadius:12,
              background:"var(--cream2)", border:"1px solid var(--border)",
              color:"var(--ink2)",
            }}>
              {ex}
              <button onClick={()=>onChange(exclusions.filter(e=>e!==ex))} style={{
                background:"none",border:"none",color:"var(--ink3)",fontSize:12,
                cursor:"pointer",lineHeight:1,padding:"0 2px",
              }}>×</button>
            </span>
          ))}
        </div>
      )}
      {/* Custom entry */}
      <div style={{display:"flex",gap:6}}>
        <input
          value={customInput}
          onChange={e=>setCustomInput(e.target.value)}
          onKeyDown={e=>{if(e.key==="Enter")addCustom();}}
          placeholder="Add custom exclusion…"
          style={{flex:1,fontSize:12}}
        />
        <button className="btn-g btn-s" onClick={addCustom} style={{flexShrink:0,whiteSpace:"nowrap"}}>+ Add</button>
      </div>
    </div>
  );
}

// ── Scope Item Card ───────────────────────────────────────────────────────────
function ScopeItemCard({ item, itemIndex, mats, laborCats, wastePct, ovhd, mkup,
  onUpdate, onDelete, defaultOpen, itemTypes, onAddItemType,
  finishes, onAddFinish, exclusionOptions, onAddExclusionOption, matCategories }) {

  const [open,        setOpen]        = useState(defaultOpen);
  const [installOpen, setInstallOpen] = useState(false);
  const [altOpen,     setAltOpen]     = useState({});  // { altId: bool }

  const totals = calcItem(item, mats, laborCats, wastePct, ovhd, mkup);
  const baseNum    = itemNum(itemIndex, 0);   // "01.0"
  const installNum = itemNum(itemIndex, 1);   // "01.1"

  const updItem = patch => onUpdate({ ...item, ...patch });

  // Fab material helpers
  const addMatLine = (matId) => updItem({ materialLines: [...(item.materialLines||[]), { id:uid(), materialId:matId||mats[0].id, qty:1, unit:"LF", note:"", custom:false, customName:"", customCost:null }] });
  const updMat = (lid, fieldOrPatch, v) => updItem({ materialLines: item.materialLines.map(l => {
    if (l.id !== lid) return l;
    if (typeof fieldOrPatch === "object") return { ...l, ...fieldOrPatch };
    return { ...l, [fieldOrPatch]: v };
  })});
  const delMat = lid => updItem({ materialLines: item.materialLines.filter(l => l.id!==lid) });

  // Fab labor helpers
  const addLabLine = () => updItem({ laborLines: [...(item.laborLines||[]), { id:uid(), categoryId:laborCats[0].id, task:"", hrs:1, note:"" }] });
  const updLab = (lid,nl) => updItem({ laborLines: item.laborLines.map(l => l.id===lid ? nl : l) });
  const delLab = lid => updItem({ laborLines: item.laborLines.filter(l => l.id!==lid) });

  // Install material helpers
  const addInstMatLine = (matId) => updItem({ installMaterialLines: [...(item.installMaterialLines||[]), { id:uid(), materialId:matId||mats[0].id, qty:1, unit:"LF", note:"", custom:false, customName:"", customCost:null }] });
  const updInstMat = (lid, fieldOrPatch, v) => updItem({ installMaterialLines: item.installMaterialLines.map(l => {
    if (l.id !== lid) return l;
    if (typeof fieldOrPatch === "object") return { ...l, ...fieldOrPatch };
    return { ...l, [fieldOrPatch]: v };
  })});
  const delInstMat = lid => updItem({ installMaterialLines: item.installMaterialLines.filter(l => l.id!==lid) });

  // Install labor helpers
  const addInstLabLine = () => updItem({ installLaborLines: [...(item.installLaborLines||[]), { id:uid(), categoryId:laborCats[0].id, task:"", hrs:1, note:"" }] });
  const updInstLab = (lid,nl) => updItem({ installLaborLines: item.installLaborLines.map(l => l.id===lid ? nl : l) });
  const delInstLab = lid => updItem({ installLaborLines: item.installLaborLines.filter(l => l.id!==lid) });

  // Alternate helpers
  const addAlt = () => {
    const newAlt = blankAlternate();
    updItem({ alternates: [...(item.alternates||[]), newAlt] });
    setAltOpen(p=>({...p,[newAlt.id]:true}));
  };
  const updAlt = (aid, patch) => updItem({ alternates: item.alternates.map(a => a.id===aid ? {...a,...patch} : a) });
  const delAlt = aid => updItem({ alternates: item.alternates.filter(a => a.id!==aid) });

  const installHasContent = (item.installMaterialLines||[]).length > 0 || (item.installLaborLines||[]).length > 0;

  const sectionHeaderStyle = (accent) => ({
    display:"flex", alignItems:"center", gap:10, padding:"10px 14px",
    background: accent ? "var(--cream2)" : "var(--cream)",
    borderBottom:"1px solid var(--border)", cursor:"pointer",
    borderLeft: `3px solid ${accent}`,
  });

  return (
    <div style={{
      background:"var(--white)", border:"1px solid var(--border)", borderRadius:3,
      boxShadow:"0 1px 4px var(--sh)", overflow:"hidden",
    }}>
      {/* ── Item top header ── */}
      <div style={{
        padding:"11px 14px", display:"flex", alignItems:"center", gap:10,
        borderBottom:"1px solid var(--border)", background:"var(--white)",
      }}>
        <button onClick={()=>setOpen(o=>!o)} style={{
          background:"none",border:"none",color:"var(--ink3)",fontSize:14,padding:"0 4px",
          lineHeight:1,flexShrink:0,cursor:"pointer",
          transform:open?"rotate(90deg)":"rotate(0deg)",transition:"transform .15s",
        }}>▶</button>

        {/* Item number badge */}
        <div style={{
          fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:600,
          color:"var(--bronze)", background:"var(--cream2)", border:"1px solid var(--border)",
          padding:"3px 9px", borderRadius:2, flexShrink:0, letterSpacing:".05em",
        }}>{baseNum}</div>

        <input
          value={item.name}
          onChange={e => updItem({name:e.target.value})}
          placeholder="Item name (e.g. Entry stair — north side)"
          onClick={e => e.stopPropagation()}
          style={{
            flex:1, fontSize:13, fontWeight:500, background:"transparent",
            border:"none", borderBottom:"1px dashed var(--border2)", borderRadius:0,
            padding:"2px 0", color:"var(--ink)",
          }}
        />

        <div style={{width:210, flexShrink:0}} onClick={e=>e.stopPropagation()}>
          <TypeSelect value={item.type} onChange={v=>updItem({type:v})}
            types={itemTypes} onAddType={onAddItemType}/>
        </div>

        <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:"var(--bronze)",fontWeight:600,flexShrink:0,minWidth:88,textAlign:"right"}}>
          {totals.total > 0 ? fmt(totals.total) : "—"}
        </div>

        <button className="btn-d" style={{flexShrink:0}}
          onClick={e=>{e.stopPropagation();onDelete();}}>✕</button>
      </div>

      {/* Description + Qty — always visible below header row */}
      <div style={{
        padding:"0 14px 10px 14px",
        borderBottom:"1px solid var(--border)",
        background:"var(--white)",
        display:"flex", gap:12, alignItems:"flex-start",
      }} onClick={e=>e.stopPropagation()}>
        <textarea
          rows={2}
          value={item.description||""}
          onChange={e=>updItem({description:e.target.value})}
          placeholder="Item description — scope, dimensions, location, key details (shown on proposal)…"
          style={{
            resize:"vertical", fontSize:12, marginTop:8, flex:1,
            background:"var(--cream)", border:"1px solid var(--border)",
            borderRadius:2,
          }}
        />
        {/* LF / Riser qty field — only for Handrail/Guardrail and Stair */}
        {(item.type==="Handrail / Guardrail" || item.type==="Stair") && (
          <div style={{flexShrink:0, marginTop:8, minWidth:110}}>
            <div className="fl" style={{marginBottom:4}}>
              {item.type==="Handrail / Guardrail" ? "Linear Feet" : "Riser Qty"}
            </div>
            <input
              type="number" min="0" step={item.type==="Stair" ? "1" : "0.1"}
              value={item.qty||""}
              onChange={e=>updItem({qty:e.target.value})}
              onClick={e=>e.stopPropagation()}
              placeholder="0"
              style={{fontSize:14, fontFamily:"'DM Mono',monospace", fontWeight:600, width:"100%"}}
            />
          </div>
        )}
      </div>

      {open && (
        <div>
          {/* ── XX.0 Fabrication section ── */}
          <div style={sectionHeaderStyle("var(--bronze)")} onClick={()=>{}}>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,fontWeight:600,color:"var(--bronze)",minWidth:38}}>{baseNum}</span>
            <span style={{fontSize:12,fontWeight:500,color:"var(--ink2)",flex:1}}>Fabrication</span>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"var(--bronze)",fontWeight:600}}>
              {totals.base.total > 0 ? fmt(totals.base.total) : "—"}
            </span>
          </div>
          <div style={{padding:"14px 16px 16px", display:"flex", flexDirection:"column", gap:14}}>
            <LinesEditor
              matLines={item.materialLines||[]} labLines={item.laborLines||[]}
              mats={mats} laborCats={laborCats} wastePct={wastePct}
              onUpdMat={updMat} onDelMat={delMat} onAddMat={addMatLine}
              onUpdLab={updLab} onDelLab={delLab} onAddLab={addLabLine}
              matCategories={matCategories}
            />
            {/* Finish + Exclusions row */}
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
              {/* Finish */}
              <div>
                <div className="fl" style={{marginBottom:8}}>Finish</div>
                <TypeSelect
                  value={item.finish||""}
                  onChange={v=>updItem({finish:v})}
                  types={finishes}
                  onAddType={onAddFinish}
                />
                {item.finish && (
                  <div style={{marginTop:6,fontSize:11,color:"var(--ink3)",display:"flex",alignItems:"center",gap:6}}>
                    <span style={{
                      display:"inline-block",width:10,height:10,borderRadius:"50%",
                      background:"var(--bronze)",flexShrink:0,
                    }}/>
                    {item.finish}
                    <button onClick={()=>updItem({finish:""})} style={{
                      background:"none",border:"none",color:"var(--ink3)",cursor:"pointer",
                      fontSize:12,padding:"0 2px",lineHeight:1,marginLeft:2,
                    }}>×</button>
                  </div>
                )}
              </div>
              {/* Scope Notes */}
              <div>
                <div className="fl" style={{marginBottom:8}}>Scope Notes</div>
                <textarea rows={3} value={item.notes||""} onChange={e=>updItem({notes:e.target.value})}
                  placeholder="Scope description, assumptions, special requirements…"
                  style={{resize:"vertical",fontSize:12}}/>
              </div>
            </div>

            {/* Exclusions */}
            <ExclusionsEditor
              exclusions={item.exclusions||[]}
              onChange={v=>updItem({exclusions:v})}
              exclusionOptions={exclusionOptions}
              onAddOption={onAddExclusionOption}
            />
            {/* Fab cost breakdown */}
            <CostBreakdown t={totals.base} wastePct={wastePct} ovhd={ovhd} mkup={mkup} label="Fabrication Bid"/>
          </div>

          {/* ── XX.1 Install section ── */}
          <div style={{...sectionHeaderStyle("#5a7a8c"), borderTop:"1px solid var(--border)"}}
            onClick={()=>setInstallOpen(o=>!o)}>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,fontWeight:600,color:"#5a7a8c",minWidth:38}}>{installNum}</span>
            <span style={{fontSize:12,fontWeight:500,color:"var(--ink2)",flex:1}}>
              Install
              {!installHasContent && <span style={{fontSize:10,color:"var(--ink3)",marginLeft:8,fontWeight:400}}>click to expand</span>}
            </span>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"#5a7a8c",fontWeight:600,marginRight:8}}>
              {totals.install.total > 0 ? fmt(totals.install.total) : "—"}
            </span>
            <span style={{fontSize:11,color:"var(--ink3)",transform:installOpen?"rotate(90deg)":"rotate(0deg)",transition:"transform .15s",display:"inline-block"}}>▶</span>
          </div>
          {installOpen && (
            <div style={{padding:"14px 16px 16px",display:"flex",flexDirection:"column",gap:14,background:"#fafcfd",borderBottom:"1px solid var(--border)"}}>
              <LinesEditor
                matLines={item.installMaterialLines||[]} labLines={item.installLaborLines||[]}
                mats={mats} laborCats={laborCats} wastePct={wastePct}
                onUpdMat={updInstMat} onDelMat={delInstMat} onAddMat={addInstMatLine}
                onUpdLab={updInstLab} onDelLab={delInstLab} onAddLab={addInstLabLine}
                matCategory="Install Materials" matCategories={matCategories}
              />
              <div>
                <div className="fl" style={{marginBottom:5}}>Install Notes</div>
                <textarea rows={2} value={item.installNotes||""} onChange={e=>updItem({installNotes:e.target.value})}
                  placeholder="Install scope, access requirements, exclusions…" style={{resize:"vertical",fontSize:12}}/>
              </div>
              <CostBreakdown t={totals.install} wastePct={wastePct} ovhd={ovhd} mkup={mkup} label="Install Bid" accent="#5a7a8c"/>
            </div>
          )}

          {/* ── Alternates ── */}
          {(item.alternates||[]).map((alt, ai) => {
            const altNum = itemNum(itemIndex, ai + 2);  // .2, .3, …
            const altT   = totals.alts[ai] || {total:0};
            const isOpen = altOpen[alt.id] !== false && altOpen[alt.id] !== undefined ? altOpen[alt.id] : false;
            return (
              <div key={alt.id}>
                <div style={{...sectionHeaderStyle("#7a6a9c"), borderTop:"1px solid var(--border)"}}
                  onClick={()=>setAltOpen(p=>({...p,[alt.id]:!p[alt.id]}))}>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,fontWeight:600,color:"#7a6a9c",minWidth:38}}>{altNum}</span>
                  <input value={alt.label} onChange={e=>{e.stopPropagation();updAlt(alt.id,{label:e.target.value});}}
                    onClick={e=>e.stopPropagation()}
                    placeholder="Alternate / modification label…"
                    style={{flex:1,fontSize:12,fontWeight:500,background:"transparent",border:"none",
                      borderBottom:"1px dashed var(--border2)",borderRadius:0,padding:"1px 0",color:"var(--ink)"}}/>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"#7a6a9c",fontWeight:600,marginRight:8}}>
                    {altT.total>0?fmt(altT.total):"—"}
                  </span>
                  <button className="btn-d" style={{padding:"2px 8px",fontSize:11,flexShrink:0}}
                    onClick={e=>{e.stopPropagation();delAlt(alt.id);}}>✕</button>
                  <span style={{fontSize:11,color:"var(--ink3)",transform:isOpen?"rotate(90deg)":"rotate(0deg)",transition:"transform .15s",display:"inline-block",marginLeft:4}}>▶</span>
                </div>
                {isOpen && (
                  <div style={{padding:"14px 16px 16px",display:"flex",flexDirection:"column",gap:14,background:"#faf9fd",borderBottom:"1px solid var(--border)"}}>
                    <LinesEditor
                      matLines={alt.materialLines||[]} labLines={alt.laborLines||[]}
                      mats={mats} laborCats={laborCats} wastePct={wastePct}
                      onUpdMat={(lid,f,v)=>updAlt(alt.id,{materialLines:alt.materialLines.map(l=>l.id===lid?{...l,[f]:v}:l)})}
                      onDelMat={lid=>updAlt(alt.id,{materialLines:alt.materialLines.filter(l=>l.id!==lid)})}
                      onAddMat={matId=>updAlt(alt.id,{materialLines:[...(alt.materialLines||[]),{id:uid(),materialId:matId||mats[0].id,qty:1,note:""}]})}
                      onUpdLab={(lid,nl)=>updAlt(alt.id,{laborLines:alt.laborLines.map(l=>l.id===lid?nl:l)})}
                      onDelLab={lid=>updAlt(alt.id,{laborLines:alt.laborLines.filter(l=>l.id!==lid)})}
                      onAddLab={()=>updAlt(alt.id,{laborLines:[...(alt.laborLines||[]),{id:uid(),categoryId:laborCats[0].id,task:"",hrs:1,note:""}]})}
                      matCategories={matCategories}
                    />
                    <div>
                      <div className="fl" style={{marginBottom:5}}>Notes</div>
                      <textarea rows={2} value={alt.notes||""} onChange={e=>updAlt(alt.id,{notes:e.target.value})}
                        placeholder="Alternate scope notes…" style={{resize:"vertical",fontSize:12}}/>
                    </div>
                    <CostBreakdown t={altT} wastePct={wastePct} ovhd={ovhd} mkup={mkup} label="Alternate Bid" accent="#7a6a9c"/>
                  </div>
                )}
              </div>
            );
          })}

          {/* Add alternate button */}
          <div style={{padding:"10px 14px",borderTop:"1px solid var(--border)",display:"flex",gap:8,justifyContent:"flex-end",background:"var(--cream)"}}>
            <button className="btn-g btn-s" onClick={addAlt}>
              + Add Alternate / Mod ({itemNum(itemIndex, (item.alternates||[]).length + 2)})
            </button>
          </div>

          {/* Combined item total */}
          <div style={{padding:"10px 14px",background:"var(--ink)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"#6a6660",letterSpacing:".08em"}}>
              {baseNum} + {installNum}{(item.alternates||[]).length>0?` + ${(item.alternates||[]).length} alt(s)`:""}
            </span>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <span style={{fontSize:12,color:"var(--bronze3)"}}>Combined Item Total</span>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:16,color:"var(--white)",fontWeight:600}}>{fmt(totals.total)}</span>
            </div>
          </div>

          {/* ── Per-unit rate panel (Handrail/Guardrail = LF, Stair = per riser) ── */}
          {(item.type==="Handrail / Guardrail" || item.type==="Stair") && (() => {
            const qty    = parseFloat(item.qty) || 0;
            const unit   = item.type==="Handrail / Guardrail" ? "LF" : "Riser";
            const fabPU  = qty > 0 ? totals.base.total / qty    : null;
            const instPU = qty > 0 ? totals.install.total / qty : null;
            const totPU  = qty > 0 ? totals.total / qty         : null;
            const mono   = {fontFamily:"'DM Mono',monospace"};
            return (
              <div style={{
                background:"var(--cream2)", borderTop:"2px solid var(--bronze3)",
                padding:"12px 16px", display:"flex", gap:0,
              }}>
                <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:".1em",color:"var(--ink3)",fontWeight:500,alignSelf:"center",minWidth:100}}>
                  Cost per {unit}
                </div>
                <div style={{flex:1, display:"flex", gap:8}}>
                  {[
                    ["Fabrication", fabPU,  "var(--bronze)"],
                    ["Install",     instPU, "#5a7a8c"     ],
                    ["Total",       totPU,  "var(--ink)"  ],
                  ].map(([label, val, color]) => (
                    <div key={label} style={{
                      flex:1, background:"var(--white)", borderRadius:2,
                      border:"1px solid var(--border)", padding:"10px 14px",
                      display:"flex", flexDirection:"column", gap:3,
                    }}>
                      <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:".09em",color:"var(--ink3)",fontWeight:500}}>{label}</div>
                      {qty > 0 ? (
                        <div style={{...mono, fontSize:16, fontWeight:700, color}}>
                          {`$${Number(val).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`}
                          <span style={{fontSize:10,fontWeight:400,color:"var(--ink3)",marginLeft:3}}>/{unit}</span>
                        </div>
                      ) : (
                        <div style={{...mono, fontSize:13, color:"var(--ink3)"}}>
                          — <span style={{fontSize:10}}>enter {unit.toLowerCase()} qty</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

// ── Cost Breakdown mini-table ─────────────────────────────────────────────────
function CostBreakdown({ t, wastePct, ovhd, mkup, label, accent }) {
  const ac = accent || "var(--bronze)";
  return (
    <div style={{background:"var(--cream2)",borderRadius:2,border:"1px solid var(--border)",overflow:"hidden"}}>
      {[
        ["Raw Material",         t.rawMat],
        [`Waste (${wastePct}%)`, t.matW - t.rawMat],
        ["Material w/ Waste",   t.matW],
        ["Labor",               t.labor],
        [`Overhead (${ovhd}%)`, t.ovAmt],
        [`Markup (${mkup}%)`,   t.mkAmt],
      ].map(([l,v]) => (
        <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"6px 12px",borderBottom:"1px solid var(--cream3)"}}>
          <span style={{fontSize:11,color:"var(--ink3)"}}>{l}</span>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"var(--ink)"}}>{fmt(v)}</span>
        </div>
      ))}
      <div style={{display:"flex",justifyContent:"space-between",padding:"9px 12px",background:ac==="var(--bronze)"?"var(--ink)":"#2a3a45"}}>
        <span style={{fontSize:12,color:"var(--bronze3)",fontWeight:500}}>{label}</span>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:14,color:"var(--white)",fontWeight:600}}>{fmt(t.total)}</span>
      </div>
    </div>
  );
}

// ── Labor Line Row ────────────────────────────────────────────────────────────
function LaborLineRow({ line, laborCats, onChange, onDelete, calcOpen, onToggleCalc }) {
  const cat = laborCats.find(c => c.id === line.categoryId);
  const bb  = calcOpen ? "none" : "1px solid var(--cream3)";

  return (
    <tr>
      <td style={{padding:"6px 10px",borderBottom:bb,verticalAlign:"middle"}}>
        <select
          value={line.categoryId}
          onChange={e => onChange({ ...line, categoryId: e.target.value })}
          style={{width:"100%", minWidth:140, fontSize:12}}
        >
          <option value="">— Category —</option>
          {laborCats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </td>
      <td style={{padding:"6px 10px",borderBottom:bb,verticalAlign:"middle"}}>
        {cat ? (
          <select
            value={line.task || ""}
            onChange={e => onChange({ ...line, task: e.target.value })}
            style={{width:"100%", minWidth:160, fontSize:12}}
          >
            <option value="">— Task —</option>
            {cat.tasks.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        ) : (
          <span style={{fontSize:11,color:"var(--ink3)"}}>Select category first</span>
        )}
      </td>
      <td style={{padding:"6px 10px",borderBottom:bb,verticalAlign:"middle",width:90}}>
        <input type="number" min="0" step="0.25" value={line.hrs}
          onChange={e => onChange({ ...line, hrs: e.target.value })}
          style={{width:"100%", fontSize:12}}
        />
      </td>
      <td style={{padding:"6px 10px",borderBottom:bb,verticalAlign:"middle",width:90,textAlign:"right",fontFamily:"'DM Mono',monospace",fontSize:11,color:"var(--ink3)"}}>
        {cat ? fmt(cat.rate) : "—"}
      </td>
      <td style={{padding:"6px 10px",borderBottom:bb,verticalAlign:"middle",width:110}}>
        <span style={{color:"var(--bronze)",fontWeight:600,fontFamily:"'DM Mono',monospace",fontSize:12}}>
          {cat ? fmt(cat.rate * Number(line.hrs)) : "—"}
        </span>
      </td>
      <td style={{padding:"6px 10px",borderBottom:bb,verticalAlign:"middle"}}>
        <input value={line.note} onChange={e => onChange({...line, note:e.target.value})}
          placeholder="Note" style={{fontSize:12}}/>
      </td>
      <td style={{padding:"6px 10px",borderBottom:bb,verticalAlign:"middle",width:36,textAlign:"center"}}>
        <CalcBtn hasCalc={!!(line.calc?.steps?.length)} active={calcOpen} onClick={onToggleCalc}/>
      </td>
      <td style={{padding:"6px 10px",borderBottom:bb,verticalAlign:"middle",width:44,textAlign:"center"}}>
        <button className="btn-d" onClick={onDelete}>✕</button>
      </td>
    </tr>
  );
}

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --cream:#f5f2ec;--cream2:#ede9e0;--cream3:#e2ddd3;
  --ink:#1c1a17;--ink2:#3a3730;--ink3:#6b6760;
  --bronze:#8c6d3f;--bronze2:#b08a55;--bronze3:#d4aa7a;
  --rust:#a0462a;--white:#ffffff;
  --border:#d5cfc5;--border2:#c5bfb3;
  --sh:rgba(28,26,23,.08);--sh2:rgba(28,26,23,.18);
}
html,body,#root{height:100%;background:var(--cream);color:var(--ink);font-family:'DM Sans',sans-serif;font-size:13px;}
h1,h2,h3,h4{font-family:'Cormorant Garamond',serif;font-weight:600;}
input,select,textarea{background:var(--white);border:1px solid var(--border2);color:var(--ink);font-family:'DM Sans',sans-serif;font-size:12px;border-radius:2px;padding:7px 10px;outline:none;width:100%;transition:border .15s;}
input:focus,select:focus,textarea:focus{border-color:var(--bronze);box-shadow:0 0 0 2px rgba(140,109,63,.12);}
button{cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:500;border:none;border-radius:2px;transition:all .15s;}
.btn-p{background:var(--ink);color:var(--cream);padding:9px 22px;font-size:13px;letter-spacing:.04em;}
.btn-p:hover{background:var(--ink2);}
.btn-g{background:transparent;border:1px solid var(--border2);color:var(--ink3);padding:7px 16px;font-size:12px;}
.btn-g:hover{border-color:var(--bronze);color:var(--bronze);}
.btn-b{background:var(--bronze);color:var(--white);padding:8px 20px;font-size:13px;letter-spacing:.03em;}
.btn-b:hover{background:var(--bronze2);}
.btn-d{background:transparent;border:1px solid #e0c8c0;color:var(--rust);padding:4px 10px;font-size:12px;}
.btn-d:hover{background:#fdf0ec;}
.btn-s{padding:5px 12px;font-size:12px;}
::-webkit-scrollbar{width:5px;height:5px;}
::-webkit-scrollbar-track{background:var(--cream);}
::-webkit-scrollbar-thumb{background:var(--cream3);border-radius:3px;}

.app{display:flex;flex-direction:column;height:100vh;}
.topbar{height:60px;background:var(--ink);display:flex;align-items:center;padding:0 20px;gap:16px;flex-shrink:0;border-bottom:2px solid var(--bronze);}
.topbar-logo{display:flex;align-items:center;gap:12px;}
.tdv{width:1px;height:28px;background:#2e2c28;}
.tsub{font-size:9px;color:#5a5650;letter-spacing:.22em;text-transform:uppercase;margin-top:2px;}
.tnav{display:flex;gap:2px;margin-left:8px;}
.tnav button{background:transparent;border:none;color:#6a6660;padding:7px 14px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;border-bottom:2px solid transparent;}
.tnav button.act{color:var(--bronze3);border-bottom-color:var(--bronze);}
.tnav button:hover:not(.act){color:var(--cream);}
.tr{margin-left:auto;}
.body{display:flex;flex:1;overflow:hidden;}

.sidebar{background:var(--white);border-right:1px solid var(--border);display:flex;flex-direction:column;flex-shrink:0;transition:width .18s ease;overflow:hidden;}
.sidebar[data-open="true"]{width:288px;}
.sidebar[data-open="false"]{width:36px;}
.sidebar-toggle{width:36px;height:40px;display:flex;align-items:center;justify-content:center;cursor:pointer;background:transparent;border:none;border-bottom:1px solid var(--border);color:var(--ink3);font-size:14px;flex-shrink:0;transition:color .15s,background .15s;padding:0;}
.sidebar-toggle:hover{color:var(--bronze);background:var(--cream);}
.sidebar-content{display:flex;flex-direction:column;flex:1;overflow:hidden;width:288px;}
.sh{padding:15px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.sh h3{font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:600;color:var(--ink2);}
.elist{flex:1;overflow-y:auto;padding:10px;}
.ecard{padding:13px;border-radius:3px;border:1px solid transparent;cursor:pointer;margin-bottom:6px;transition:all .12s;}
.ecard:hover{background:var(--cream);border-color:var(--border);}
.ecard.act{background:var(--cream);border-color:var(--bronze);border-left:3px solid var(--bronze);}
.ename{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:600;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.emeta{color:var(--ink3);font-size:11px;margin-top:3px;}
.etotal{color:var(--bronze);font-size:13px;font-weight:600;margin-top:6px;font-family:'DM Mono',monospace;}
.sbadge{display:inline-block;padding:2px 8px;border-radius:2px;font-size:10px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;}
.sb-Draft{background:#f0ede6;color:#8c7a5a;border:1px solid #d5c8a8;}
.sb-Sent{background:#e8f0f5;color:#3a6a8c;border:1px solid #a8c8e0;}
.sb-Won{background:#eaf2ec;color:#3a7a50;border:1px solid #a8d0b8;}
.sb-Lost{background:#f5eae8;color:#8c3a2a;border:1px solid #d0a8a0;}

.main{flex:1;overflow-y:auto;background:var(--cream);display:flex;flex-direction:column;}
.mi{padding:24px;display:flex;flex-direction:column;gap:16px;max-width:1100px;}
.empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;color:var(--ink3);text-align:center;}
.empty h2{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:300;color:var(--cream3);}
.card{background:var(--white);border:1px solid var(--border);border-radius:3px;box-shadow:0 1px 4px var(--sh);}
.ch{padding:13px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.ch h3{font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:600;color:var(--ink2);}
.cb{padding:18px;}
.ig{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;}
.fl{font-size:10px;color:var(--ink3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px;}
.factors{display:flex;gap:14px;flex-wrap:wrap;}

.rt{width:100%;border-collapse:collapse;}
.rt th{padding:9px 12px;font-size:10px;color:var(--ink3);border-bottom:1px solid var(--border);text-align:left;text-transform:uppercase;letter-spacing:.1em;}
.rt td{padding:7px 12px;border-bottom:1px solid var(--cream3);}

.mo{position:fixed;inset:0;background:rgba(28,26,23,.6);z-index:100;display:flex;align-items:center;justify-content:center;}
.md{background:var(--white);border:1px solid var(--border);border-top:3px solid var(--bronze);border-radius:3px;padding:30px;width:520px;max-width:95vw;box-shadow:0 8px 40px var(--sh2);}
.md h2{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:600;margin-bottom:20px;}
.mg{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.mf{display:flex;justify-content:flex-end;gap:10px;margin-top:22px;}

/* Proposal */
.po{position:fixed;inset:0;background:#e8e4de;z-index:200;overflow-y:auto;padding:24px 0 0;}
.pd{max-width:760px;margin:0 auto;background:#fff;color:#1c1a17;font-family:'DM Sans',sans-serif;font-size:12px;box-shadow:0 0 40px rgba(0,0,0,.18);border:1px solid #d8d3cb;margin-bottom:0;}
/* Header — compact, border-only, no filled background */
.pc{padding:20px 32px 16px;border-bottom:2px solid #1c1a17;display:flex;align-items:center;justify-content:space-between;gap:24px;}
.pc-left{display:flex;flex-direction:column;gap:6px;}
.pc-proj{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;color:#1c1a17;line-height:1.2;}
.pc-meta{display:flex;gap:20px;flex-wrap:wrap;}
.pmi{margin:0;}
.pmi dt{font-size:9px;text-transform:uppercase;letter-spacing:.14em;color:#8a8680;}
.pmi dd{font-size:11px;color:#1c1a17;margin:1px 0 0;font-weight:500;}
.pc-right{text-align:right;flex-shrink:0;}
.pc-right .p-label{font-size:9px;text-transform:uppercase;letter-spacing:.18em;color:#8a8680;}
.pc-right .p-date{font-family:'DM Mono',monospace;font-size:11px;color:#555;margin-top:3px;}
/* Scope items */
.pitm{border-bottom:1px solid #e0dbd2;page-break-inside:avoid;break-inside:avoid;}
.pi-row{display:flex;align-items:baseline;justify-content:space-between;padding:7px 32px;gap:16px;border-bottom:1px solid #ede9e2;}
.pi-row:last-child{border-bottom:none;}
.pi-num{font-family:'DM Mono',monospace;font-size:9px;font-weight:700;color:#8c6d3f;min-width:28px;flex-shrink:0;}
.pi-name{font-family:'Cormorant Garamond',serif;font-size:13px;font-weight:600;color:#1c1a17;flex:1;}
.pi-type{font-size:8px;color:#8a8680;text-transform:uppercase;letter-spacing:.1em;margin-left:6px;}
.pi-desc{font-size:9px;color:#555;line-height:1.6;padding:0 32px 6px 32px;max-width:600px;}
.pi-meta{display:flex;gap:14px;padding:3px 32px 7px;flex-wrap:wrap;}
.pi-meta-item{font-size:9px;color:#666;}
.pi-meta-item strong{color:#8c6d3f;font-weight:500;}
.pi-note{font-size:9px;color:#555;line-height:1.6;padding:3px 32px 7px;border-left:none;}
.pi-sub{display:flex;align-items:baseline;justify-content:space-between;padding:4px 32px 4px 50px;gap:16px;border-bottom:1px solid #f0ece6;}
.pi-sub .pi-num{color:#888;font-size:8px;}
.pi-sub .pi-sname{font-size:9px;color:#555;}
.pi-total{display:flex;align-items:baseline;justify-content:space-between;padding:6px 32px;border-top:1px solid #d0cbc2;background:#faf8f4;}
.pi-total .lb{font-size:9px;text-transform:uppercase;letter-spacing:.08em;color:#8a8680;}
.pi-total .vl{font-family:'DM Mono',monospace;font-size:12px;color:#8c6d3f;font-weight:700;}
.pi-price{font-family:'DM Mono',monospace;font-size:10px;color:#1c1a17;font-weight:600;}
/* Grand total */
.pgrand{display:flex;justify-content:space-between;align-items:baseline;padding:12px 32px;border-top:2px solid #1c1a17;margin-top:4px;}
.pgrand .lb{font-family:'Cormorant Garamond',serif;font-size:15px;color:#1c1a17;font-weight:600;}
.pgrand .vl{font-family:'DM Mono',monospace;font-size:16px;color:#8c6d3f;font-weight:700;}
/* Footer */
.pftr{border-top:1px solid #e0dbd2;padding:10px 32px;font-size:9px;color:#8a8680;display:flex;justify-content:space-between;align-items:center;}
.pact{display:flex;gap:12px;justify-content:center;padding:16px;}
@media print{
  *{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}
  html,body{background:#fff!important;}
  .pact{display:none!important;}
  .app{display:none!important;}
  .po{position:static!important;background:#fff!important;padding:0!important;overflow:visible!important;}
  .pd{box-shadow:none!important;max-width:none!important;width:100%!important;border:none!important;}
  .pitm{page-break-inside:avoid;break-inside:avoid;}
  .pgrand{page-break-inside:avoid;break-inside:avoid;}
  .pi-total{background:none!important;}
}
`;

// ── Main App ──────────────────────────────────────────────────────────────────

// ── Password gate ─────────────────────────────────────────────────────────────
const TEAM_PASSWORD = import.meta.env.VITE_TEAM_PASSWORD || "tiltshift2025";
function PasswordGate({ onAuth }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const submit = () => {
    if (pw === TEAM_PASSWORD) { sessionStorage.setItem("ts_auth","1"); onAuth(); }
    else { setErr(true); setPw(""); }
  };
  return (
    <div style={{position:"fixed",inset:0,background:"var(--ink)",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <style>{`:root{--ink:#1c1a17;--cream:#f5f2ec;--bronze:#8c6d3f;--border:#d5cfc5;}`}</style>
      <div style={{background:"var(--cream)",border:"1px solid var(--border)",borderTop:"3px solid var(--bronze)",borderRadius:3,padding:40,width:360,textAlign:"center"}}>
        <LogoPrimaryWhite height={72}/>
        <div style={{marginBottom:20,marginTop:16}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:600,color:"var(--ink)",marginBottom:6}}>Estimating</div>
          <div style={{fontSize:12,color:"#6b6760"}}>Enter your team password to continue</div>
        </div>
        <input type="password" value={pw} onChange={e=>{setPw(e.target.value);setErr(false);}}
          onKeyDown={e=>e.key==="Enter"&&submit()}
          placeholder="Team password"
          style={{width:"100%",marginBottom:8,fontSize:14,padding:"10px 12px",border:`1px solid ${err?"#a0462a":"var(--border)"}`,borderRadius:2,background:"#fff"}}
          autoFocus/>
        {err && <div style={{fontSize:11,color:"#a0462a",marginBottom:8}}>Incorrect password — try again</div>}
        <button onClick={submit}
          style={{width:"100%",padding:"10px",background:"var(--bronze)",color:"#fff",border:"none",borderRadius:2,fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default function App() {
  // ── Auth ────────────────────────────────────────────────────────────────────
  const [authed, setAuthed] = useState(!!sessionStorage.getItem("ts_auth"));

  // ── Core state ──────────────────────────────────────────────────────────────
  const [tab, setTab]         = useState("estimate");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [ests, setEsts]       = useState([]);
  const [actId, setActId]     = useState(null);
  const [mats, setMats]       = useState(DEFAULT_MATERIALS);
  const [laborCats, setLaborCats] = useState(DEFAULT_LABOR_CATEGORIES);
  const [itemTypes, setItemTypes]     = useState(DEFAULT_ITEM_TYPES);
  const [clients, setClients]         = useState(DEFAULT_CLIENTS);
  const [finishes, setFinishes]       = useState(DEFAULT_FINISHES);
  const [exclusionOptions, setExclusionOptions] = useState(DEFAULT_EXCLUSION_OPTIONS);
  const [estimators, setEstimators]   = useState(ESTIMATORS);
  const [matCategories, setMatCategories] = useState(["Square Tube","Rect Tube","Round Tube","Pipe","Flat Bar","Round Bar","Angle","C Channel","W Beam","Sheet","Plate","Hardware","Install Materials"]);
  const [showAddMat, setShowAddMat]   = useState(false);
  const [addMatTargetItemId, setAddMatTargetItemId] = useState(null); // scope item to add line to after saving
  const [newMatForm, setNewMatForm]   = useState({name:"",category:"Hardware",priceLF:"",priceLB:"",priceEA:""});
  const [showNew, setShowNew] = useState(false);
  const [showProp, setShowProp] = useState(false);
  const [dbReady, setDbReady] = useState(false);
  const [dbError, setDbError] = useState(false);
  const [saving, setSaving]   = useState(false);
  const saveTimer = useRef(null);
  const [nf, setNf] = useState({
    project:"", client:"", estimator:"", jobNumber:"",
    date: new Date().toISOString().slice(0,10),
    wastePct:10, markupPct:20, overhead:8,
  });

  // ── Persistence: Supabase is the single source of truth ─────────────────────
  // Load everything from Supabase on mount. Save every change immediately.
  // localStorage is NOT used — all team members always see the same data.

  // Bump this any time DEFAULT_MATERIALS or DEFAULT_LABOR_CATEGORIES changes.
  // On load, if Supabase has an older version the defaults are pushed to the DB.
  const CONFIG_VERSION = 3;

  // Load on mount
  useEffect(() => {
    if (!authed) return;
    if (!supabase) {
      setDbError(true);
      setDbReady(true);
      return;
    }
    (async () => {
      try {
        // Load estimates
        const { data: estRows, error: estErr } = await supabase
          .from("estimates").select("*").order("created_at", { ascending: false });
        if (estErr) throw estErr;
        if (estRows?.length) setEsts(estRows.map(r => ({ ...r.data, id: r.id })));

        // Load config
        const { data: cfg, error: cfgErr } = await supabase.from("config").select("*");
        if (cfgErr) throw cfgErr;

        const get = key => cfg?.find(r => r.key === key)?.value;
        const savedVersion = get("config_version") ?? 0;

        if (savedVersion < CONFIG_VERSION) {
          // Push new defaults to Supabase and use them in-app
          // (preserves estimates and user-edited lists like clients/estimators)
          const newConfig = [
            { key:"config_version",  value: CONFIG_VERSION },
            { key:"mats",            value: DEFAULT_MATERIALS },
            { key:"matCategories",   value: ["Square Tube","Rect Tube","Round Tube","Pipe","Flat Bar","Round Bar","Angle","C Channel","W Beam","Sheet","Plate","Hardware","Install Materials"] },
            { key:"laborCats",       value: DEFAULT_LABOR_CATEGORIES },
          ];
          await supabase.from("config").upsert(newConfig, { onConflict: "key" });
          setMats(DEFAULT_MATERIALS);
          setMatCategories(["Square Tube","Rect Tube","Round Tube","Pipe","Flat Bar","Round Bar","Angle","C Channel","W Beam","Sheet","Plate","Hardware","Install Materials"]);
          setLaborCats(DEFAULT_LABOR_CATEGORIES);
          // Still load any user-saved lists that aren't being reset
          if (get("itemTypes"))        setItemTypes(get("itemTypes"));
          if (get("clients"))          setClients(get("clients"));
          if (get("finishes"))         setFinishes(get("finishes"));
          if (get("exclusionOptions")) setExclusionOptions(get("exclusionOptions"));
          if (get("estimators"))       setEstimators(get("estimators"));
        } else {
          // Version current — load everything from Supabase as-is
          if (get("mats")             !== undefined) setMats(get("mats"));
          if (get("laborCats")        !== undefined) setLaborCats(get("laborCats"));
          if (get("itemTypes")        !== undefined) setItemTypes(get("itemTypes"));
          if (get("clients")          !== undefined) setClients(get("clients"));
          if (get("finishes")         !== undefined) setFinishes(get("finishes"));
          if (get("exclusionOptions") !== undefined) setExclusionOptions(get("exclusionOptions"));
          if (get("estimators")       !== undefined) setEstimators(get("estimators"));
          if (get("matCategories")    !== undefined) setMatCategories(get("matCategories"));
        }
      } catch(e) {
        console.error("Supabase load error:", e);
        setDbError(true);
      }
      setDbReady(true);
    })();
  }, [authed]);

  // Save estimates to Supabase on every change (debounced 800ms)
  useEffect(() => {
    if (!supabase || !dbReady) return;
    clearTimeout(saveTimer.current);
    setSaving(true);
    saveTimer.current = setTimeout(async () => {
      try {
        if (ests.length > 0) {
          for (const est of ests) {
            const { id, ...data } = est;
            await supabase.from("estimates").upsert({ id, data }, { onConflict: "id" });
          }
        }
      } catch(e) { console.error("Supabase estimate save error:", e); }
      setSaving(false);
    }, 800);
  }, [ests, dbReady]);

  // Save config to Supabase immediately on every change
  useEffect(() => {
    if (!supabase || !dbReady) return;
    (async () => {
      try {
        await supabase.from("config").upsert([
          { key:"mats",             value: mats },
          { key:"laborCats",        value: laborCats },
          { key:"itemTypes",        value: itemTypes },
          { key:"clients",          value: clients },
          { key:"finishes",         value: finishes },
          { key:"exclusionOptions", value: exclusionOptions },
          { key:"estimators",       value: estimators },
          { key:"matCategories",    value: matCategories },
        ], { onConflict: "key" });
      } catch(e) { console.error("Supabase config save error:", e); }
    })();
  }, [mats, laborCats, itemTypes, clients, finishes, exclusionOptions, estimators, matCategories, dbReady]);

  // ── Callbacks and derived values (ALL hooks/callbacks must come before any return) ──
  const activeEst = ests.find(e => e.id === actId) || null;

  const updEst = useCallback((id, u) =>
    setEsts(p => p.map(e => e.id !== id ? e : (typeof u==="function" ? u(e) : {...e,...u}))), []);

  const allTotals = useCallback((est) => {
    if (!est) return { items:[], total:0 };
    const items = est.scopeItems.map(i => calcItem(i, mats, laborCats, est.wastePct, est.overhead, est.markupPct));
    return { items, total: items.reduce((s,t) => s + t.total, 0) };
  }, [mats, laborCats]);

  const create = useCallback(() => {
    const id = uid();
    const est = {
      id, project:nf.project, client:nf.client, estimator:nf.estimator,
      jobNumber:nf.jobNumber||"",
      date:nf.date, wastePct:nf.wastePct, markupPct:nf.markupPct, overhead:nf.overhead,
      status:"Draft",
      scopeItems: [blankScopeItem()],
    };
    setEsts(p => [est, ...p]);
    setActId(id); setTab("estimate"); setShowNew(false);
    setNf({ project:"",client:"",estimator:"",jobNumber:"",date:new Date().toISOString().slice(0,10),wastePct:10,markupPct:20,overhead:8 });
  }, [nf, estimators]);

  const addScopeItem = useCallback((estId) => {
    setEsts(p => p.map(e => e.id!==estId ? e : {...e, scopeItems:[...e.scopeItems, blankScopeItem()]}));
  }, []);
  const updScopeItem = useCallback((estId, itemId, newItemOrFn) => {
    setEsts(p => p.map(e => e.id!==estId ? e : {...e, scopeItems:e.scopeItems.map(i => {
      if (i.id !== itemId) return i;
      return typeof newItemOrFn === "function" ? newItemOrFn(i) : newItemOrFn;
    })}));
  }, []);
  const delScopeItem = useCallback((estId, itemId) => {
    setEsts(p => p.map(e => e.id!==estId ? e : {...e, scopeItems:e.scopeItems.filter(i=>i.id!==itemId)}));
  }, []);

  const delEst = useCallback(async (id) => {
    setEsts(p => p.filter(e => e.id !== id));
    setActId(prev => prev === id ? null : prev);
    if (supabase) {
      try { await supabase.from("estimates").delete().eq("id", id); }
      catch(e) { console.warn("Supabase delete failed", e); }
    }
  }, []);

  const addLaborCat = useCallback(() => setLaborCats(p => [...p, {id:uid(), name:"New Category", rate:70, tasks:[]}]), []);
  const updLaborCat = useCallback((cid, patch) => setLaborCats(p => p.map(c => c.id===cid ? {...c,...patch} : c)), []);
  const delLaborCat = useCallback((cid) => setLaborCats(p => p.filter(c => c.id!==cid)), []);
  const addTask = useCallback((cid) => setLaborCats(p => p.map(c => c.id!==cid ? c : {...c, tasks:[...c.tasks,"New Task"]})), []);
  const updTask = useCallback((cid,idx,val) => setLaborCats(p=>p.map(c=>c.id!==cid?c:{...c,tasks:c.tasks.map((t,i)=>i===idx?val:t)})), []);
  const delTask = useCallback((cid,idx) => setLaborCats(p=>p.map(c=>c.id!==cid?c:{...c,tasks:c.tasks.filter((_,i)=>i!==idx)})), []);

  const sT = activeEst ? allTotals(activeEst) : null;

  // ── Auth / loading gates (after all hooks) ───────────────────────────────────
  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;
  if (!dbReady) return (
    <div style={{position:"fixed",inset:0,background:"var(--ink)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16}}>
      <LogoPrimaryWhite height={72}/>
      <div style={{color:"#6a6660",fontSize:12,fontFamily:"'DM Sans',sans-serif",letterSpacing:".06em"}}>Connecting to database…</div>
    </div>
  );
  if (dbError) return (
    <div style={{position:"fixed",inset:0,background:"var(--ink)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16,padding:40}}>
      <LogoPrimaryWhite height={72}/>
      <div style={{color:"#c87060",fontSize:14,fontFamily:"'DM Sans',sans-serif",fontWeight:500,marginTop:8}}>Database not connected</div>
      <div style={{color:"#6a6660",fontSize:12,fontFamily:"'DM Sans',sans-serif",textAlign:"center",maxWidth:360,lineHeight:1.7}}>
        Supabase environment variables are missing or incorrect.<br/>
        Check <code style={{background:"#2a2825",padding:"1px 6px",borderRadius:2,fontSize:11}}>VITE_SUPABASE_URL</code> and <code style={{background:"#2a2825",padding:"1px 6px",borderRadius:2,fontSize:11}}>VITE_SUPABASE_ANON_KEY</code> in your Vercel project settings, then redeploy.
      </div>
    </div>
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="app">

        {/* TOPBAR */}
        <header className="topbar">
          <div className="topbar-logo">
            <LogoMarkWhite height={34}/>
            <div className="tdv"/>
            <div>
              <LogoWordmarkWhite height={20}/>
              <div className="tsub">Estimating</div>
            </div>
          </div>
          <div className="tdv"/>
          <nav className="tnav">
            {[["estimate","Estimator"],["materials","Materials"],["labor","Labor Rates"],["types","Item Types"],["history","All Estimates"]].map(([t,l])=>(
              <button key={t} className={tab===t?"act":""} onClick={()=>setTab(t)}>{l}</button>
            ))}
          </nav>
          <div className="tr">
            {saving && (
              <span style={{fontSize:11,color:"var(--bronze3)",letterSpacing:".06em",marginRight:8}}>Saving…</span>
            )}
            {!saving && dbReady && supabase && (
              <span style={{fontSize:11,color:"#5a7a8c",letterSpacing:".06em",marginRight:8}}>✓ Saved</span>
            )}
            <button className="btn-b btn-s" onClick={()=>setShowNew(true)}>+ New Estimate</button>
          </div>
        </header>

        <div className="body">
          {/* SIDEBAR */}
          {(tab==="estimate"||tab==="history") && (
            <aside className="sidebar" data-open={String(sidebarOpen)}>
              <button className="sidebar-toggle" onClick={()=>setSidebarOpen(o=>!o)}
                title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}>
                {sidebarOpen ? "❮" : "❯"}
              </button>
              {sidebarOpen && (
                <div className="sidebar-content">
                  <div className="sh">
                    <h3>Estimates</h3>
                    <span style={{fontSize:11,color:"var(--ink3)"}}>{ests.length} total</span>
                  </div>
                  <div className="elist">
                    {ests.length===0 && <div style={{padding:"24px 12px",color:"var(--ink3)",textAlign:"center",fontSize:12,lineHeight:1.7}}>No estimates yet.<br/>Click <strong>+ New Estimate</strong> to begin.</div>}
                    {ests.map(est=>{
                      const {total}=allTotals(est);
                      return (
                        <div key={est.id} className={`ecard${actId===est.id?" act":""}`} onClick={()=>{setActId(est.id);setTab("estimate");}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                            <div className="ename" style={{flex:1,minWidth:0}}>{est.project||"Untitled Project"}</div>
                            <button className="btn-d" style={{flexShrink:0,marginLeft:6,fontSize:11,padding:"1px 6px"}}
                              onClick={e=>{e.stopPropagation();if(confirm(`Delete "${est.project||"Untitled Project"}"?`))delEst(est.id);}}>✕</button>
                          </div>
                          {est.jobNumber && <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"var(--bronze)",marginTop:2,fontWeight:500}}>{est.jobNumber}</div>}
                          <div className="emeta">{est.client} · {est.date}</div>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8}}>
                            <span className={`sbadge sb-${est.status}`}>{est.status}</span>
                            <span className="etotal">{total?fmt(total):"—"}</span>
                          </div>
                          <div style={{marginTop:5,fontSize:10,color:"var(--ink3)"}}>
                            {est.scopeItems.length} item{est.scopeItems.length!==1?"s":""}
                            {est.scopeItems.filter(i=>i.name).map(i=>i.name).slice(0,2).join(", ") && ` · ${est.scopeItems.filter(i=>i.name).map(i=>i.name).slice(0,2).join(", ")}`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </aside>
          )}

          <main className="main">

            {/* ── ESTIMATE TAB ── */}
            {tab==="estimate" && !activeEst && (
              <div className="empty">
                <h2>No Estimate Open</h2>
                <p style={{fontSize:13}}>Select an estimate or create a new one.</p>
                <button className="btn-b" onClick={()=>setShowNew(true)}>+ New Estimate</button>
              </div>
            )}

            {tab==="estimate" && activeEst && (
              <div className="mi">
                {/* Project info card */}
                <div className="card">
                  <div className="ch">
                    <h3>Project Information</h3>
                    <div style={{display:"flex",gap:8}}>
                      <select value={activeEst.status} onChange={e=>updEst(actId,{status:e.target.value})} style={{width:120,fontSize:12}}>
                        {STATUS_LIST.map(s=><option key={s}>{s}</option>)}
                      </select>
                      <button className="btn-g btn-s" onClick={()=>setShowProp(true)}>Preview Proposal</button>
                    </div>
                  </div>
                  <div className="cb">
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14}}>
                      <div><div className="fl">Project Name</div><input value={activeEst.project} onChange={e=>updEst(actId,{project:e.target.value})} placeholder="e.g. Riverside Lofts"/></div>
                      <div><div className="fl">Job Number</div><input value={activeEst.jobNumber||""} onChange={e=>updEst(actId,{jobNumber:e.target.value})} placeholder="e.g. 2025-047"/></div>
                      <div><div className="fl">Client</div>
                        <TypeSelect
                          value={activeEst.client}
                          onChange={v=>updEst(actId,{client:v})}
                          types={clients}
                          onAddType={t=>setClients(p=>[...p,t])}
                        />
                      </div>
                      <div><div className="fl">Date</div><input type="date" value={activeEst.date} onChange={e=>updEst(actId,{date:e.target.value})}/></div>
                      <div><div className="fl">Estimator</div>
                        <TypeSelect
                          value={activeEst.estimator}
                          onChange={v=>updEst(actId,{estimator:v})}
                          types={estimators}
                          onAddType={t=>setEstimators(p=>[...p,t])}
                        />
                      </div>
                    </div>
                    <div style={{marginTop:16,paddingTop:16,borderTop:"1px solid var(--cream3)"}}>
                      <div className="fl" style={{marginBottom:10}}>Cost Factors (applied to all items)</div>
                      <div className="factors">
                        {[["Waste %","wastePct"],["Overhead %","overhead"],["Markup %","markupPct"]].map(([lb,k])=>(
                          <div key={k}><div className="fl">{lb}</div>
                            <input type="number" value={activeEst[k]} onChange={e=>updEst(actId,{[k]:e.target.value})} style={{width:90}}/>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Estimate Summary — between project info and scope items ── */}
                {sT && activeEst.scopeItems.length > 0 && (
                  <div className="card">
                    <div className="ch"><h3>Estimate Summary</h3>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:"var(--bronze)",fontWeight:600}}>{fmt(sT.total)}</span>
                    </div>
                    <div style={{padding:0}}>
                      <table style={{width:"100%",borderCollapse:"collapse"}}>
                        <thead><tr>
                          {["#","Item","Type","Fabrication","Install","Item Total"].map(h=>(
                            <th key={h} style={{textAlign: h==="Fabrication"||h==="Install"||h==="Item Total" ? "right" : "left",fontSize:10,textTransform:"uppercase",letterSpacing:".1em",color:"var(--ink3)",padding:"8px 12px",borderBottom:"1px solid var(--border)",fontWeight:500}}>{h}</th>
                          ))}
                        </tr></thead>
                        <tbody>
                          {activeEst.scopeItems.map((item,i)=>{
                            const t = sT.items[i];
                            const fabTotal     = t.base.total;
                            const installTotal = t.install.total + t.alts.reduce((s,a)=>s+a.total,0);
                            const hasInstall   = installTotal > 0;
                            return (
                              <tr key={item.id} style={{borderBottom:"1px solid var(--cream3)"}}>
                                <td style={{padding:"10px 12px",fontFamily:"'DM Mono',monospace",fontSize:12,color:"var(--bronze)",fontWeight:600,whiteSpace:"nowrap"}}>{itemNum(i,0)}</td>
                                <td style={{padding:"10px 12px",color:"var(--ink)",fontWeight:500,maxWidth:200}}>{item.name||`Item ${i+1}`}</td>
                                <td style={{padding:"10px 12px",color:"var(--ink3)",fontSize:11}}>{item.type||"—"}</td>
                                <td style={{padding:"10px 12px",textAlign:"right",fontFamily:"'DM Mono',monospace",fontSize:12}}>{fmt(fabTotal)}</td>
                                <td style={{padding:"10px 12px",textAlign:"right",fontFamily:"'DM Mono',monospace",fontSize:12,color: hasInstall ? "var(--ink)" : "var(--ink3)"}}>
                                  {hasInstall ? fmt(installTotal) : <span style={{color:"var(--ink3)",fontSize:11}}>—</span>}
                                </td>
                                <td style={{padding:"10px 12px",textAlign:"right",fontFamily:"'DM Mono',monospace",fontSize:13,color:"var(--bronze)",fontWeight:700}}>{fmt(t.total)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"11px 18px",background:"var(--ink)"}}>
                      <span style={{color:"var(--bronze3)",fontSize:13,fontWeight:500,letterSpacing:".03em"}}>Total Combined Bid</span>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:18,color:"var(--white)",fontWeight:600}}>{fmt(sT.total)}</span>
                    </div>
                  </div>
                )}

                {/* Scope items section */}
                <div style={{display:"flex",alignItems:"center",marginTop:4}}>
                  <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:600,color:"var(--ink)"}}>
                    Scope Items
                    <span style={{fontSize:14,fontWeight:400,color:"var(--ink3)",marginLeft:10}}>
                      {activeEst.scopeItems.length} item{activeEst.scopeItems.length!==1?"s":""}
                    </span>
                  </h2>
                </div>

                {/* Scope item cards */}
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {activeEst.scopeItems.map((item,idx) => (
                    <ScopeItemCard
                      key={item.id}
                      item={item}
                      itemIndex={idx}
                      mats={mats}
                      laborCats={laborCats}
                      wastePct={activeEst.wastePct}
                      ovhd={activeEst.overhead}
                      mkup={activeEst.markupPct}
                      onUpdate={newItem => updScopeItem(actId, item.id, newItem)}
                      onDelete={() => delScopeItem(actId, item.id)}
                      defaultOpen={idx===0}
                      itemTypes={itemTypes}
                      onAddItemType={t => setItemTypes(p=>[...p,t])}
                      finishes={finishes}
                      onAddFinish={t => setFinishes(p=>[...p,t])}
                      exclusionOptions={exclusionOptions}
                      onAddExclusionOption={setExclusionOptions}
                      matCategories={matCategories}
                    />
                  ))}
                  {activeEst.scopeItems.length===0 && (
                    <div style={{padding:"24px",textAlign:"center",color:"var(--ink3)",background:"var(--white)",border:"1px dashed var(--border2)",borderRadius:3}}>
                      No scope items yet — add your first item below.
                    </div>
                  )}
                </div>

                {/* Add Scope Item — below cards */}
                <div style={{display:"flex",justifyContent:"center",paddingTop:4}}>
                  <button className="btn-b" onClick={()=>addScopeItem(actId)}
                    style={{padding:"10px 32px",fontSize:13,letterSpacing:".04em"}}>
                    + Add Scope Item
                  </button>
                </div>
              </div>
            )}

            {/* ── MATERIALS TAB ── */}
            {tab==="materials" && (
              <div className="mi">
                <div className="card">
                  <div className="ch">
                    <h3>Material Price List</h3>
                    <button className="btn-b btn-s" onClick={()=>setShowAddMat(true)}>+ Add New Material</button>
                  </div>
                  <div style={{padding:0,overflowX:"auto"}}>
                    <table className="rt">
                      <thead><tr>
                        <th>Category</th>
                        <th>Name</th>
                        <th style={{textAlign:"right"}}>$/LF or $/SqFt</th>
                        <th style={{textAlign:"right"}}>$/LB</th>
                        <th style={{textAlign:"right"}}>$/EA (20' stick)</th>
                        <th/>
                      </tr></thead>
                      <tbody>{mats.map(m=>(
                        <tr key={m.id}>
                          <td>
                            <select value={m.category} onChange={e=>setMats(p=>p.map(x=>x.id===m.id?{...x,category:e.target.value}:x))}>
                              {matCategories.map(c=><option key={c}>{c}</option>)}
                            </select>
                          </td>
                          <td><input value={m.name} onChange={e=>setMats(p=>p.map(x=>x.id===m.id?{...x,name:e.target.value}:x))}/></td>
                          <td><input type="number" value={m.priceLF ?? m.priceSF ?? 0} step="0.01" style={{width:90,textAlign:"right"}}
                            onChange={e=>{
                              const v = parseFloat(e.target.value)||0;
                              setMats(p=>p.map(x=>x.id===m.id ? (x.priceSF !== undefined ? {...x,priceSF:v} : {...x,priceLF:v}) : x));
                            }}/></td>
                          <td><input type="number" value={m.priceLB ?? 0} step="0.01" style={{width:90,textAlign:"right"}}
                            onChange={e=>setMats(p=>p.map(x=>x.id===m.id?{...x,priceLB:parseFloat(e.target.value)||0}:x))}/></td>
                          <td><input type="number" value={m.priceEA ?? 0} step="0.01" style={{width:100,textAlign:"right"}}
                            onChange={e=>setMats(p=>p.map(x=>x.id===m.id?{...x,priceEA:parseFloat(e.target.value)||0}:x))}/></td>
                          <td><button className="btn-d" onClick={()=>setMats(p=>p.filter(x=>x.id!==m.id))}>✕</button></td>
                        </tr>
                      ))}</tbody>
                    </table>
                  </div>
                </div>

                {/* Material Categories */}
                <div className="card">
                  <div className="ch">
                    <h3>Material Categories</h3>
                    <button className="btn-g btn-s" onClick={()=>setMatCategories(p=>[...p,"New Category"])}>+ Add Category</button>
                  </div>
                  <div style={{padding:18,display:"flex",flexDirection:"column",gap:8}}>
                    {matCategories.map((cat,i)=>(
                      <div key={i} style={{display:"flex",gap:8,alignItems:"center"}}>
                        <input value={cat} onChange={e=>setMatCategories(p=>p.map((x,j)=>j===i?e.target.value:x))}/>
                        <button className="btn-d btn-s" style={{flexShrink:0}}
                          onClick={()=>setMatCategories(p=>p.filter((_,j)=>j!==i))}>✕</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── LABOR RATES TAB ── */}
            {tab==="labor" && (
              <div className="mi">
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:600}}>Labor Rates</h2>
                  <button className="btn-g btn-s" onClick={addLaborCat}>+ Add Category</button>
                </div>
                {laborCats.map(cat=>(
                  <div key={cat.id} className="card">
                    <div className="ch" style={{gap:10}}>
                      <input value={cat.name} onChange={e=>updLaborCat(cat.id,{name:e.target.value})}
                        style={{fontSize:16,fontFamily:"'Cormorant Garamond',serif",fontWeight:600,background:"transparent",border:"none",borderBottom:"1px dashed var(--border2)",borderRadius:0,color:"var(--ink2)",width:"auto",flex:1}}/>
                      <button className="btn-d btn-s" onClick={()=>delLaborCat(cat.id)}>Remove</button>
                    </div>
                    <div className="cb" style={{display:"flex",flexDirection:"column",gap:14}}>
                      {/* Category rate */}
                      <div style={{display:"flex",alignItems:"center",gap:16,padding:"12px 16px",background:"var(--cream2)",borderRadius:2,border:"1px solid var(--border)"}}>
                        <div>
                          <div className="fl">Category Rate ($/Hr)</div>
                          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}>
                            <input type="number" value={cat.rate} onChange={e=>updLaborCat(cat.id,{rate:parseFloat(e.target.value)||0})} style={{width:110,fontSize:14,fontFamily:"'DM Mono',monospace",fontWeight:600}}/>
                            <span style={{fontSize:11,color:"var(--ink3)"}}>applied to all tasks in this category</span>
                          </div>
                        </div>
                      </div>
                      {/* Task labels */}
                      <div>
                        <div className="fl" style={{marginBottom:8}}>Task Labels</div>
                        <div style={{display:"flex",flexDirection:"column",gap:6}}>
                          {cat.tasks.map((t,i)=>(
                            <div key={i} style={{display:"flex",gap:8,alignItems:"center"}}>
                              <input value={t} onChange={e=>updTask(cat.id,i,e.target.value)} style={{fontSize:12}}/>
                              <button className="btn-d btn-s" style={{flexShrink:0}} onClick={()=>delTask(cat.id,i)}>✕</button>
                            </div>
                          ))}
                          <button className="btn-g btn-s" style={{alignSelf:"flex-start",marginTop:2}} onClick={()=>addTask(cat.id)}>+ Add Task</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── ITEM TYPES TAB ── */}
            {tab==="types" && (
              <div className="mi">
                <div className="card">
                  <div className="ch">
                    <h3>Scope Item Types</h3>
                    <span style={{fontSize:11,color:"var(--ink3)"}}>Used in the type dropdown on each scope item</span>
                  </div>
                  <div style={{padding:18,display:"flex",flexDirection:"column",gap:8}}>
                    {itemTypes.map((t,i)=>(
                      <div key={i} style={{display:"flex",gap:8,alignItems:"center"}}>
                        <input value={t} onChange={e=>setItemTypes(p=>p.map((x,j)=>j===i?e.target.value:x))}/>
                        <button className="btn-d btn-s" style={{flexShrink:0}} onClick={()=>setItemTypes(p=>p.filter((_,j)=>j!==i))}>✕</button>
                      </div>
                    ))}
                    <button className="btn-g btn-s" style={{alignSelf:"flex-start",marginTop:4}}
                      onClick={()=>setItemTypes(p=>[...p,""])}>+ Add Type</button>
                  </div>
                </div>
              </div>
            )}

            {/* ── HISTORY TAB ── */}
            {tab==="history" && (
              <div className="mi">
                <div className="card">
                  <div className="ch"><h3>All Estimates</h3></div>
                  <div style={{padding:0}}>
                    {ests.length===0
                      ? <div style={{padding:24,color:"var(--ink3)",textAlign:"center"}}>No estimates yet.</div>
                      : <table style={{width:"100%",borderCollapse:"collapse"}}>
                          <thead><tr>
                            {["Project","Client","Items","Estimator","Date","Status","Total"].map(h=>(
                              <th key={h} style={{textAlign:"left",fontSize:10,color:"var(--ink3)",padding:"8px 12px",borderBottom:"1px solid var(--border)",letterSpacing:".1em",textTransform:"uppercase",fontWeight:500}}>{h}</th>
                            ))}
                          </tr></thead>
                          <tbody>{ests.map(est=>{
                            const {total}=allTotals(est);
                            return (
                              <tr key={est.id} style={{cursor:"pointer"}} onClick={()=>{setActId(est.id);setTab("estimate");}}>
                                <td style={{padding:"9px 12px",borderBottom:"1px solid var(--cream3)",color:"var(--bronze)",fontWeight:500}}>{est.project||"Untitled"}</td>
                                <td style={{padding:"9px 12px",borderBottom:"1px solid var(--cream3)"}}>{est.client}</td>
                                <td style={{padding:"9px 12px",borderBottom:"1px solid var(--cream3)",fontSize:11,color:"var(--ink3)"}}>{est.scopeItems.length}</td>
                                <td style={{padding:"9px 12px",borderBottom:"1px solid var(--cream3)",color:"var(--ink3)"}}>{est.estimator}</td>
                                <td style={{padding:"9px 12px",borderBottom:"1px solid var(--cream3)",fontFamily:"'DM Mono',monospace",fontSize:11,color:"var(--ink3)"}}>{est.date}</td>
                                <td style={{padding:"9px 12px",borderBottom:"1px solid var(--cream3)"}}><span className={`sbadge sb-${est.status}`}>{est.status}</span></td>
                                <td style={{padding:"9px 12px",borderBottom:"1px solid var(--cream3)",textAlign:"right",fontFamily:"'DM Mono',monospace",color:"var(--bronze)",fontWeight:600}}>{total?fmt(total):"—"}</td>
                              </tr>
                            );
                          })}</tbody>
                        </table>
                    }
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* NEW ESTIMATE MODAL */}
      {showNew && (
        <div className="mo" onClick={e=>e.target===e.currentTarget&&setShowNew(false)}>
          <div className="md">
            <h2>New Estimate</h2>
            <div className="mg">
              <div><div className="fl">Project Name</div><input value={nf.project} onChange={e=>setNf(f=>({...f,project:e.target.value}))} placeholder="e.g. Riverside Lofts"/></div>
              <div><div className="fl">Job Number</div><input value={nf.jobNumber||""} onChange={e=>setNf(f=>({...f,jobNumber:e.target.value}))} placeholder="e.g. 2025-047"/></div>
              <div><div className="fl">Client</div>
                <TypeSelect
                  value={nf.client||""}
                  onChange={v=>setNf(f=>({...f,client:v}))}
                  types={clients}
                  onAddType={t=>setClients(p=>[...p,t])}
                />
              </div>
              <div><div className="fl">Estimator</div>
                <TypeSelect
                  value={nf.estimator||""}
                  onChange={v=>setNf(f=>({...f,estimator:v}))}
                  types={estimators}
                  onAddType={t=>setEstimators(p=>[...p,t])}
                />
              </div>
              <div><div className="fl">Date</div><input type="date" value={nf.date} onChange={e=>setNf(f=>({...f,date:e.target.value}))}/></div>
              <div><div className="fl">Waste %</div><input type="number" value={nf.wastePct} onChange={e=>setNf(f=>({...f,wastePct:e.target.value}))}/></div>
              <div><div className="fl">Markup %</div><input type="number" value={nf.markupPct} onChange={e=>setNf(f=>({...f,markupPct:e.target.value}))}/></div>
            </div>
            <p style={{fontSize:11,color:"var(--ink3)",marginTop:14}}>You'll add individual scope items after creating the estimate.</p>
            <div className="mf">
              <button className="btn-g" onClick={()=>setShowNew(false)}>Cancel</button>
              <button className="btn-p" onClick={create}>Create Estimate</button>
            </div>
          </div>
        </div>
      )}

      {/* PROPOSAL */}
      {showProp && activeEst && (()=>{
        const est=activeEst;
        const {items:iT, total:grand}=allTotals(est);
        return (
          <div className="po">
            <div className="pact">
              <button className="btn-g" onClick={()=>setShowProp(false)}>✕ Close</button>
              <button className="btn-b" onClick={()=>window.print()}>Print / Save PDF</button>
            </div>
            <div className="pd">

              {/* ── Compact header ── */}
              <div className="pc">
                <div className="pc-left">
                  <div style={{filter:"invert(1) brightness(0)",display:"inline-block"}}><LogoWordmarkWhite height={18}/></div>
                  <div className="pc-proj">{est.project||"Project Proposal"}</div>
                  <div className="pc-meta">
                    {est.jobNumber && <dl className="pmi"><dt>Job No.</dt><dd>{est.jobNumber}</dd></dl>}
                    {est.client    && <dl className="pmi"><dt>Prepared For</dt><dd>{est.client}</dd></dl>}
                    {est.estimator && <dl className="pmi"><dt>Estimator</dt><dd>{est.estimator}</dd></dl>}
                  </div>
                </div>
                <div className="pc-right">
                  <div className="p-label">Estimate / Proposal</div>
                  <div className="p-date">{est.date}</div>
                </div>
              </div>

              {/* ── One row per scope item ── */}
              {est.scopeItems.map((item,i)=>{
                const pt         = iT[i];
                const baseNum    = itemNum(i, 0);
                const installNum = itemNum(i, 1);
                const hasInstall = pt.install.total > 0;

                return (
                  <div key={item.id} className="pitm">

                    {/* Name + total */}
                    <div className="pi-row">
                      <div style={{display:"flex",alignItems:"baseline",gap:8,flex:1,minWidth:0}}>
                        <span className="pi-num">{baseNum.slice(0,2)}</span>
                        <span className="pi-name">{item.name||`Item ${i+1}`}</span>
                      </div>
                      {/* Only show total here if no sub-breakdown below */}
                      {!(hasInstall || (item.alternates||[]).some((_,ai)=>pt.alts[ai]?.total>0)) && (
                        <span className="pi-price" style={{color:"#8c6d3f"}}>{fmt(pt.total)}</span>
                      )}
                    </div>

                    {/* Description — with top rule, narrower width */}
                    {item.description && (
                      <div className="pi-desc" style={{borderTop:"1px solid #ede9e2",paddingTop:6,maxWidth:"70%"}}>{item.description}</div>
                    )}

                    {/* Finish / Exclusions inline */}
                    {(item.finish || (item.exclusions||[]).length>0) && (
                      <div className="pi-meta">
                        {item.finish && (
                          <span className="pi-meta-item"><strong>Finish:</strong> {item.finish}</span>
                        )}
                        {(item.exclusions||[]).length>0 && (
                          <span className="pi-meta-item"><strong>Excludes:</strong> {item.exclusions.join(", ")}</span>
                        )}
                      </div>
                    )}

                    {/* Notes */}
                    {item.notes && (
                      <div className="pi-note">{item.notes}</div>
                    )}

                    {/* Sub-line rows only if install or alternates present */}
                    {(hasInstall || (item.alternates||[]).some((_,ai)=>pt.alts[ai]?.total>0)) && (
                      <div>
                        <div className="pi-sub">
                          <div style={{display:"flex",alignItems:"baseline",gap:8,flex:1}}>
                            <span className="pi-num">{baseNum}</span>
                            <span className="pi-sname">Fabrication</span>
                          </div>
                          <span className="pi-price" style={{fontSize:9,color:"#555"}}>{fmt(pt.base.total)}</span>
                        </div>
                        {hasInstall && (
                          <div className="pi-sub">
                            <div style={{display:"flex",alignItems:"baseline",gap:8,flex:1}}>
                              <span className="pi-num" style={{color:"#5a7a8c"}}>{installNum}</span>
                              <span className="pi-sname">Install{item.installNotes ? ` — ${item.installNotes}` : ""}</span>
                            </div>
                            <span className="pi-price" style={{fontSize:9,color:"#555"}}>{fmt(pt.install.total)}</span>
                          </div>
                        )}
                        {(item.alternates||[]).map((alt,ai)=>{
                          const altT = pt.alts[ai]||{total:0};
                          if (altT.total<=0) return null;
                          return (
                            <div key={alt.id} className="pi-sub">
                              <div style={{display:"flex",alignItems:"baseline",gap:8,flex:1}}>
                                <span className="pi-num" style={{color:"#7a6a9c"}}>{itemNum(i,ai+2)}</span>
                                <span className="pi-sname">Alt{alt.label?` — ${alt.label}`:""}</span>
                              </div>
                              <span className="pi-price" style={{fontSize:9,color:"#555"}}>{fmt(altT.total)}</span>
                            </div>
                          );
                        })}
                        <div className="pi-total">
                          <span className="lb">Item {baseNum.slice(0,2)} Total</span>
                          <span className="vl">{fmt(pt.total)}</span>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}

              {/* ── Grand total ── */}
              <div className="pgrand">
                <span className="lb">Total Bid Price</span>
                <span className="vl">{fmt(grand)}</span>
              </div>

              {/* ── Footer ── */}
              <div className="pftr">
                <span>Tilt Shift Design · tiltshiftdesign.com · Bellingham, WA</span>
                <span>Estimate valid 30 days · Prices subject to material market conditions</span>
              </div>

            </div>
          </div>
        );
      })()}
      {/* ADD MATERIAL TO LIBRARY MODAL */}
      {showAddMat && (
        <div className="mo" onClick={e=>e.target===e.currentTarget&&setShowAddMat(false)}>
          <div className="md" style={{maxWidth:480}}>
            <h2>{addMatTargetItemId ? "Add Material to Library & Estimate" : "Add Material to Library"}</h2>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div>
                <div className="fl">Material Name</div>
                <input value={newMatForm.name} onChange={e=>setNewMatForm(f=>({...f,name:e.target.value}))}
                  placeholder='e.g. 1.5" × 3" Rectangular Tube 11ga'/>
              </div>
              <div>
                <div className="fl">Category</div>
                <TypeSelect
                  value={newMatForm.category}
                  onChange={v=>setNewMatForm(f=>({...f,category:v}))}
                  types={matCategories}
                  onAddType={t=>{setMatCategories(p=>[...p,t]);setNewMatForm(f=>({...f,category:t}));}}
                />
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
                <div>
                  <div className="fl">$/LF (or $/SqFt)</div>
                  <input type="number" step="0.01" min="0"
                    value={newMatForm.priceLF}
                    onChange={e=>setNewMatForm(f=>({...f,priceLF:e.target.value}))}
                    placeholder="0.00"/>
                </div>
                <div>
                  <div className="fl">$/LB</div>
                  <input type="number" step="0.01" min="0"
                    value={newMatForm.priceLB}
                    onChange={e=>setNewMatForm(f=>({...f,priceLB:e.target.value}))}
                    placeholder="0.00"/>
                </div>
                <div>
                  <div className="fl">$/EA (20' stick)</div>
                  <input type="number" step="0.01" min="0"
                    value={newMatForm.priceEA}
                    onChange={e=>setNewMatForm(f=>({...f,priceEA:e.target.value}))}
                    placeholder="0.00"/>
                </div>
              </div>
              <div style={{fontSize:11,color:"var(--ink3)",lineHeight:1.6}}>
                Leave any price at 0 to hide that unit option. For sheet or plate, enter the per-SqFt price in the first field.
              </div>
            </div>
            <div className="mf">
              <button className="btn-g" onClick={()=>{
                setShowAddMat(false);
                setAddMatTargetItemId(null);
                setNewMatForm({name:"",category:"Hardware",priceLF:"",priceLB:"",priceEA:""});
              }}>Cancel</button>
              <button className="btn-p" onClick={()=>{
                if(!newMatForm.name.trim()) return;
                const newMat = {
                  id: uid(),
                  category: newMatForm.category,
                  name: newMatForm.name.trim(),
                  priceLF: parseFloat(newMatForm.priceLF)||0,
                  priceLB: parseFloat(newMatForm.priceLB)||0,
                  priceEA: parseFloat(newMatForm.priceEA)||0,
                };
                setMats(p => [...p, newMat]);
                // If opened from a scope item, add a line for this material immediately
                if (addMatTargetItemId) {
                  const defaultUnit = newMat.priceLF ? "LF" : newMat.priceEA ? "EA" : newMat.priceLB ? "LB" : "LF";
                  updScopeItem(actId, addMatTargetItemId, prev => ({
                    ...prev,
                    materialLines: [...(prev.materialLines||[]), { id:uid(), materialId:newMat.id, qty:1, unit:defaultUnit, note:"", customCost:null }]
                  }));
                }
                setShowAddMat(false);
                setAddMatTargetItemId(null);
                setNewMatForm({name:"",category:"Hardware",priceLF:"",priceLB:"",priceEA:""});
              }}>Add to Library</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
