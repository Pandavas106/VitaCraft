import React from "react";
import { FormSection, InputField } from "../FormSection";

function PersonalData({ resumeData, setResumeData,openSections ,toggleSection}) {
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [name]: value,
      },
    });
  };

  return (
    <FormSection
      title="Personal Information"
      isOpen={openSections.personalInfo}
      toggle={() => toggleSection("personalInfo")}
    >
      <InputField
        label="Full Name"
        name="name"
        value={resumeData.personalInfo.name}
        onChange={handlePersonalInfoChange}
      />
      <InputField
        label="Short Name"
        name="shortName"
        value={resumeData.personalInfo.shortName}
        onChange={handlePersonalInfoChange}
      />
      <InputField
        label="Email"
        name="email"
        value={resumeData.personalInfo.email}
        onChange={handlePersonalInfoChange}
        type="email"
      />
      <InputField
        label="Phone"
        name="phone"
        value={resumeData.personalInfo.phone}
        onChange={handlePersonalInfoChange}
      />
      <InputField
        label="Address"
        name="address"
        value={resumeData.personalInfo.address}
        onChange={handlePersonalInfoChange}
      />
      <InputField
        label="LinkedIn"
        name="linkedIn"
        value={resumeData.personalInfo.linkedIn}
        onChange={handlePersonalInfoChange}
      />
      <InputField
        label="LinkedIn URL"
        name="linkedInURL"
        value={resumeData.personalInfo.linkedInURL}
        onChange={handlePersonalInfoChange}
      />
    </FormSection>
  );
}

export default PersonalData;