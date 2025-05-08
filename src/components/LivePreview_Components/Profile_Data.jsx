import React from "react";
import { FormSection, TextareaField } from "../FormSection";

function ProfileData({
  resumeData,
  setResumeData,
  openSections,
  toggleSection,
}) {
  const handleProfileChange = (e) => {
    setResumeData({
      ...resumeData,
      profile: e.target.value,
    });
  };
  return (
    <FormSection
      title="Profile"
      isOpen={openSections.profile}
      toggle={() => toggleSection("profile")}
    >
      <TextareaField
        label="Profile Description"
        name="profile"
        value={resumeData.profile}
        onChange={handleProfileChange}
      />
    </FormSection>
  );
}

export default ProfileData;
