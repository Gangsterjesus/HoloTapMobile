/**
 * =============================================================================
 *  HoloTap Mobile — API Configuration Module
 * =============================================================================
 *  Author:        R. Newton (Raymond Newton) HoloTap Engineering Team.
 *  Co‑Author:     Microsoft Copilot (AI Engineering Assistant)
 *
 *  File:          config.js
 *  Description:   Centralised configuration for backend API connectivity used by
 *                 HoloTapMobile. Provides a single source of truth for the base
 *                 API endpoint, ensuring consistent networking behaviour across
 *                 all screens, hooks, and services.
 *
 *  Version:       1.0.0
 *  Created:       15 July 2026
 *
 *  Engineering Notes:
 *  - The Android emulator cannot access localhost directly; it must use the
 *    special alias 10.0.2.2 to reach the Windows host machine.
 *  - All fetch calls in HoloTapMobile must reference API_URL to avoid hard‑coded
 *    endpoints and ensure portability across environments.
 *  - Changing the backend port or host requires updating only this file.
 *
 *  Copyright:
 *  © 2026 HoloTap. All rights reserved.
 * =============================================================================
 */


export const API_URL = "http://10.0.2.2:4000";
