"use client";

import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox";

const topics = [
  "Design systems",
  "Accessibility",
  "Performance",
  "Testing",
  "Animation",
];

export default function CheckboxCustomValidation() {
  return (
    <CheckboxGroup
      label="Topics to follow"
      description="Choose up to three."
      defaultValue={["Accessibility"]}
      validationBehavior="aria"
      validate={(value) =>
        value.length > 3 ? "You can follow up to three topics." : null
      }
    >
      {topics.map((topic) => (
        <Checkbox key={topic} value={topic}>
          {topic}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
