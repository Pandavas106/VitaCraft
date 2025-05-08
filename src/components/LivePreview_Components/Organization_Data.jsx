import React from "react";
import { ArrayField, FormSection, InputField } from "../FormSection";

function OrganizationData({
  resumeData,
  setResumeData,
  openSections,
  toggleSection,
}) {
  const handleOrganizationChange = (e, index) => {
    const { name, value } = e.target;
    const newOrganizations = [...resumeData.organizations];
    newOrganizations[index] = {
      ...newOrganizations[index],
      [name]: value,
    };
    setResumeData({
      ...resumeData,
      organizations: newOrganizations,
    });
  };
  return (
    <FormSection
      title="Organizations"
      isOpen={openSections.organizations}
      toggle={() => toggleSection("organizations")}
    >
      <ArrayField
        items={resumeData.organizations}
        setItems={(newItems) =>
          setResumeData({ ...resumeData, organizations: newItems })
        }
        renderItem={(org, index) => (
          <div>
            <InputField
              label="Organization Name"
              name="name"
              value={org.name}
              onChange={(e) => handleOrganizationChange(e, index)}
            />
            <InputField
              label="Position"
              name="position"
              value={org.position}
              onChange={(e) => handleOrganizationChange(e, index)}
            />
            <InputField
              label="Location"
              name="location"
              value={org.location}
              onChange={(e) => handleOrganizationChange(e, index)}
            />
          </div>
        )}
        addNewItem={() => {
          const newOrganizations = [...resumeData.organizations];
          const newId = newOrganizations.length
            ? Math.max(...newOrganizations.map((o) => o.id)) + 1
            : 1;
          newOrganizations.push({
            id: newId,
            name: "",
            position: "",
            location: "",
          });
          setResumeData({
            ...resumeData,
            organizations: newOrganizations,
          });
        }}
      />
    </FormSection>
  );
}

export default OrganizationData;
