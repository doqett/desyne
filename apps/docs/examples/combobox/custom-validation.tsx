"use client";

import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { ComboBox, ComboBoxItem } from "@/components/ui/combobox";

const instances = [
  { id: "t3.micro", name: "t3.micro · 1 GB" },
  { id: "t3.medium", name: "t3.medium · 4 GB" },
  { id: "m7g.large", name: "m7g.large · 8 GB" },
  { id: "m7g.2xlarge", name: "m7g.2xlarge · 32 GB" },
];

export default function ComboBoxCustomValidation() {
  return (
    <Form
      className="flex w-full max-w-72 flex-col gap-4"
      validationBehavior="aria"
      onSubmit={(e) => e.preventDefault()}
    >
      <ComboBox
        label="Instance type"
        defaultItems={instances}
        defaultValue="t3.micro"
        description="The database needs at least 4 GB of memory."
        validate={({ value }) =>
          value === "t3.micro" ? "t3.micro is too small for Postgres." : null
        }
      >
        {(i) => <ComboBoxItem>{i.name}</ComboBoxItem>}
      </ComboBox>
      <Button type="submit" className="self-start">
        Deploy
      </Button>
    </Form>
  );
}
