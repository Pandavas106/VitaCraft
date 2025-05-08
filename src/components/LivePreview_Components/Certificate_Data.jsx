import React from "react";
import { ArrayField, FormSection, InputField } from "../FormSection";

function CertificateData({ resumeData, setResumeData,openSections ,toggleSection}) {
  const handleCertificatesChange = (index, value) => {
    const newCertificates = [...resumeData.certificates];
    newCertificates[index] = value;
    setResumeData({
      ...resumeData,
      certificates: newCertificates,
    });
  };
  return (
    <FormSection
      title="Certificates"
      isOpen={openSections.certificates}
      toggle={() => toggleSection("certificates")}
    >
      <ArrayField
        items={resumeData.certificates}
        setItems={(newItems) =>
          setResumeData({ ...resumeData, certificates: newItems })
        }
        renderItem={(cert, index) => (
          <InputField
            label={`Certificate ${index + 1}`}
            name={`certificate-${index}`}
            value={cert}
            onChange={(e) => handleCertificatesChange(index, e.target.value)}
          />
        )}
        addNewItem={() => {
          const newCertificates = [...resumeData.certificates];
          newCertificates.push("");
          setResumeData({
            ...resumeData,
            certificates: newCertificates,
          });
        }}
      />
    </FormSection>
  );
}

export default CertificateData;
