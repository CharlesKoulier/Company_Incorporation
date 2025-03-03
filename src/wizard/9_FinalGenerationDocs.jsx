import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useCompany } from "../CompanyContext";
import { generateStatutsPdfDefinition } from "../documents/statutsTemplate";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Configure pdfMake
pdfMake.vfs = pdfFonts.vfs;

function FinalGenerationDocs() {
  const { t } = useTranslation();
  const { state, setCurrentStep, updateStep } = useCompany();
  const [pdfs, setPdfs] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Convert base64 => Blob => "downloadable" URL
  const base64toBlob = (base64, contentType = "application/pdf") => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  };

  const handleDownload = (base64Data, fileName) => {
    if (!base64Data) return;
    const blob = base64toBlob(base64Data, "application/pdf");
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerateStatuts = async () => {
    try {
      setIsGenerating(true);

      // Get and validate data
      const companyName = state.step3?.companyName;
      if (!companyName) {
        throw new Error(t("COMPANY_NAME_REQUIRED", "Company name is required"));
      }

      const companyType = state.step2?.type;
      if (!companyType) {
        throw new Error(t("COMPANY_TYPE_REQUIRED", "Company type is required"));
      }

      // Create headquarters address
      let headquartersAddress = "";
      if (state.step5?.headquartersType === "koulier") {
        headquartersAddress = "44 rue Pasquier, 75008 Paris";
      } else {
        const address = state.step5?.address || "";
        const postalCode = state.step5?.postalCode || "";
        const city = state.step5?.city || "";

        if (!address || !postalCode || !city) {
          headquartersAddress = t(
            "ADDRESS_TO_COMPLETE",
            "Address to be completed"
          );
        } else {
          headquartersAddress = `${address}, ${postalCode} ${city}`;
        }
      }

      // Prepare data for statutes generation
      const companyData = {
        companyName: companyName,
        companyType: companyType,
        headquartersAddress: headquartersAddress,
        capitalAmount: parseInt(state.step4?.capitalAmount, 10) || 1,
        socialPurpose:
          state.step3?.socialPurpose ||
          t("DEFAULT_PURPOSE", "Business consulting and services"),
        partners: state.step4?.partners || [],
      };

      console.log("Data for statutes generation:", companyData);

      // Generate PDF definition
      const docDefinition = generateStatutsPdfDefinition(companyData);

      // Create PDF
      const pdfDoc = pdfMake.createPdf(docDefinition);

      // Get PDF as base64
      pdfDoc.getBase64(
        (data) => {
          if (!data) {
            throw new Error(
              t(
                "BASE64_GENERATION_FAILED",
                "Failed to generate PDF in base64 format"
              )
            );
          }

          setPdfs((prev) => ({ ...prev, statuts: data }));

          // Update global state
          updateStep(10, {
            documentGenerated: true,
            statutsGenerated: true,
          });

          setIsGenerating(false);
        },
        (error) => {
          throw new Error(
            t("PDF_GENERATION_ERROR", "Error generating PDF: ") + error
          );
        }
      );
    } catch (error) {
      console.error("Error generating statutes:", error);
      setIsGenerating(false);
      alert(
        t(
          "GENERATION_ERROR",
          "An error occurred while generating the statutes: "
        ) + error.message
      );
    }
  };

  const handleGenerateAllDocs = async () => {
    try {
      setIsGenerating(true);

      // Get and validate data
      const companyName = state.step3?.companyName;
      if (!companyName) {
        throw new Error(t("COMPANY_NAME_REQUIRED", "Company name is required"));
      }

      const companyType = state.step2?.type;
      if (!companyType) {
        throw new Error(t("COMPANY_TYPE_REQUIRED", "Company type is required"));
      }

      // Create headquarters address
      let headquartersAddress = "";
      if (state.step5?.headquartersType === "koulier") {
        headquartersAddress = "44 rue Pasquier, 75008 Paris";
      } else {
        const address = state.step5?.address || "";
        const postalCode = state.step5?.postalCode || "";
        const city = state.step5?.city || "";

        if (!address || !postalCode || !city) {
          headquartersAddress = t(
            "ADDRESS_TO_COMPLETE",
            "Address to be completed"
          );
        } else {
          headquartersAddress = `${address}, ${postalCode} ${city}`;
        }
      }

      // Prepare data for document generation
      const companyData = {
        companyName: companyName,
        companyType: companyType,
        headquartersAddress: headquartersAddress,
        capitalAmount: parseInt(state.step4?.capitalAmount, 10) || 1,
        socialPurpose:
          state.step3?.socialPurpose ||
          t("DEFAULT_PURPOSE", "Business consulting and services"),
        partners: state.step4?.partners || [],
      };

      console.log("Data for generating all documents:", companyData);

      // Create utility function to get base64 of documents
      const getBase64 = (docDefinition) => {
        return new Promise((resolve, reject) => {
          try {
            pdfMake.createPdf(docDefinition).getBase64(resolve, (error) => {
              reject(
                new Error(
                  t("PDF_GENERATION_ERROR", "Error generating PDF: ") + error
                )
              );
            });
          } catch (error) {
            reject(error);
          }
        });
      };

      // Define all documents
      const statutsDefinition = generateStatutsPdfDefinition(companyData);

      const m0Doc = {
        content: [
          { text: t("M0_FORM", "M0 Form"), style: "header" },
          { text: "\n" },
          {
            text:
              t("COMPANY_CREATION", "Company Creation: ") + `${companyName}`,
          },
          { text: "\n" },
          {
            text: t(
              "M0_SAMPLE",
              "This document is a sample M0 form for company creation."
            ),
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
          },
        },
      };

      const dncDoc = {
        content: [
          {
            text: t("DNC_TITLE", "Declaration of Non-Condemnation"),
            style: "header",
          },
          { text: "\n" },
          { text: t("COMPANY_LABEL", "Company: ") + `${companyName}` },
          { text: "\n" },
          {
            text: t(
              "DNC_TEXT",
              "I, the undersigned, hereby certify that I have not been subject to criminal convictions..."
            ),
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
          },
        },
      };

      const rbeDoc = {
        content: [
          {
            text: t("RBE_TITLE", "Register of Beneficial Owners"),
            style: "header",
          },
          { text: "\n" },
          { text: t("COMPANY_LABEL", "Company: ") + `${companyName}` },
          { text: "\n" },
          {
            text: t(
              "RBE_TEXT",
              "Document certifying the beneficial owners of the company..."
            ),
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
          },
        },
      };

      // Generate all documents in parallel for better efficiency
      const [statutsData, m0Data, dncData, rbeData] = await Promise.all([
        getBase64(statutsDefinition),
        getBase64(m0Doc),
        getBase64(dncDoc),
        getBase64(rbeDoc),
      ]);

      // Update local state
      setPdfs({
        statuts: statutsData,
        m0: m0Data,
        dnc: dncData,
        rbe: rbeData,
      });

      // Update global state
      updateStep(10, {
        documentGenerated: true,
        statutsGenerated: true,
        m0Generated: true,
        dncGenerated: true,
        rbeGenerated: true,
      });

      setIsGenerating(false);
    } catch (error) {
      console.error("Generation error:", error);
      setIsGenerating(false);
      alert(
        t(
          "GENERATION_ERROR",
          "An error occurred while generating the documents: "
        ) + error.message
      );
    }
  };

  // Previous Button: go back to previous step (FinalReview - step 9)
  const handleBack = () => {
    setCurrentStep(9);
  };

  // Continue Button: go to next step (DocumentUpload - step 11)
  const handleNext = () => {
    setCurrentStep(11);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {t("FINAL_GENERATION_DOCS_TITLE", "Generate Common Documents")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LanguageSwitcher />

        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">
            {t("IMPORTANT_INFO", "Important information:")}
          </h4>
          <ul className="text-sm text-yellow-700 list-disc pl-5 space-y-1">
            <li>
              {t(
                "VERIFY_BEFORE_SIGNATURE",
                "Carefully check all documents before signing"
              )}
            </li>
            <li>
              {t(
                "LEGAL_DOCS",
                "These documents have legal value and will be filed with the registry"
              )}
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleGenerateStatuts}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating
              ? t("GENERATING_STATUTS", "Generating statutes...")
              : t("GENERATE_STATUTS", "Generate Statutes")}
          </Button>

          <Button
            onClick={handleGenerateAllDocs}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating
              ? t("GENERATING", "Generating...")
              : t("GENERATE_ALL", "Generate All Documents")}
          </Button>
        </div>

        {pdfs && (
          <div className="mt-4 flex flex-col space-y-2">
            <Button
              variant="outline"
              onClick={() => handleDownload(pdfs.statuts, "Statuts.pdf")}
            >
              {t("DOWNLOAD_STATUTS", "Download Statutes")}
            </Button>

            {pdfs.m0 && (
              <Button
                variant="outline"
                onClick={() => handleDownload(pdfs.m0, "M0.pdf")}
              >
                {t("DOWNLOAD_M0", "Download M0")}
              </Button>
            )}

            {pdfs.dnc && (
              <Button
                variant="outline"
                onClick={() => handleDownload(pdfs.dnc, "DNC.pdf")}
              >
                {t("DOWNLOAD_DNC", "Download DNC")}
              </Button>
            )}

            {pdfs.rbe && (
              <Button
                variant="outline"
                onClick={() => handleDownload(pdfs.rbe, "RBE.pdf")}
              >
                {t("DOWNLOAD_RBE", "Download RBE")}
              </Button>
            )}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Button onClick={handleBack} variant="outline">
            {t("BACK", "Previous")}
          </Button>
          <Button onClick={handleNext}>{t("CONTINUE", "Continue")}</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default FinalGenerationDocs;
