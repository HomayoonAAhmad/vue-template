export const optimizePersian = (value: string) =>
  String(value).replace(/[\u06F0-\u06F9\u0660-\u0669]/g, (d) =>
    String.fromCharCode(
      d.charCodeAt(0) >= 0x06f0
        ? d.charCodeAt(0) - 0x06f0 + 48
        : d.charCodeAt(0) - 0x0660 + 48,
    ),
  )

export const onlyNumber = (value: string) =>
  optimizePersian(value).replace(/\D+/g, "")
