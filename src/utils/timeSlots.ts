export const TIME_SLOTS = [
  { value: 'matin', label: 'Matinée' },
  { value: 'aprem', label: 'Après-midi' },
  { value: 'soir', label: 'Soirée' },
] as const;

export const TIME_SLOT_LABELS: Record<string, string> = Object.fromEntries(
  TIME_SLOTS.map((slot) => [slot.value, slot.label]),
);
