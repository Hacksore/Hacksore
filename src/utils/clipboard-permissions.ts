export type ClipboardPermissionState = "granted" | "denied" | "prompt" | "unknown";

/**
 * Checks clipboard write permission status
 * Returns the permission state or 'unknown' if Permissions API is not available
 */
export async function checkClipboardPermission(): Promise<ClipboardPermissionState> {
  if (!navigator.permissions) {
    // Permissions API not available, try to detect by attempting clipboard access
    if (!navigator.clipboard) {
      return "unknown";
    }
    // If clipboard API exists, assume it might work (will fail at runtime if not)
    return "prompt";
  }

  try {
    const result = await navigator.permissions.query({
      name: "clipboard-write" as PermissionName,
    });
    return result.state as ClipboardPermissionState;
    // biome-ignore lint/correctness/noUnusedVariables: cause errors
    // biome-ignore lint/suspicious/noExplicitAny: cause errors
  } catch (err: any) {
    // Some browsers don't support clipboard-write permission query
    // In that case, clipboard-write is usually granted automatically for active tabs
    if (navigator.clipboard) {
      return "granted"; // Assume granted if clipboard API is available
    }
    return "unknown";
  }
}

/**
 * Gets a user-friendly message for the permission state
 */
export function getPermissionMessage(state: ClipboardPermissionState): string {
  switch (state) {
    case "granted":
      return "Clipboard access granted";
    case "denied":
      return "Clipboard access denied - please enable in browser settings";
    case "prompt":
      return "Clipboard access will be requested when copying";
    default:
      return "Clipboard access status unknown";
  }
}
