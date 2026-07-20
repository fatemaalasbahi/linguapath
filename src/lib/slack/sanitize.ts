const SLACK_PLAIN_TEXT_MAX_LENGTH = 3000;

export function sanitizeSlackPlainText(value: string, maxLength = SLACK_PLAIN_TEXT_MAX_LENGTH): string {
  const normalized = value
    .replace(/\r\n/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1)}…`;
}
