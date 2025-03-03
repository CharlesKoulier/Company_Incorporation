import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  AlertCircle,
  FileText,
  Send,
  Download,
  CheckCircle,
} from "lucide-react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { generateStatutsPdfDefinition } from "../documents/statutsTemplate";
import { useCompany } from "../CompanyContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

// Initialize pdfMake with fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ElectronicSignature = () => {
  const { state, updateStep, setCurrentStep } = useCompany();
  const [pdfUrl, setPdfUrl] = useState(state.step11?.pdfUrl || null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  const handleGenerateStatuts = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      // posthog.capture("electronic_signature_generate_statuts_clicked");

      // Prepare company data for PDF generation
      const companyData = {
        companyName:
          state.step2?.companyName || t("DEFAULT_COMPANY_NAME", "Ma Société"),
        headquartersAddress:
          state.step5?.headquartersType === "koulier"
            ? "44 rue Pasquier, 75008 Paris"
            : `${state.step5?.address || ""}, ${
                state.step5?.postalCode || ""
              } ${state.step5?.city || ""}`,
        capitalAmount: parseInt(state.step4?.capitalAmount, 10) || 1,
        companyType: state.step2?.type || "SAS",
        // Additional data that might be needed
        partners: state.step4?.partners || [],
        startDate:
          state.step3?.startDate || new Date().toISOString().split("T")[0],
        closingDate: state.step7?.closingDay
          ? `${state.step7.closingDay} ${getMonthName(
              state.step7.closingMonth
            )}`
          : "31 décembre",
        socialPurpose:
          state.step3?.socialPurpose ||
          t("DEFAULT_PURPOSE", "Activité commerciale générale"),
        duration: state.step3?.duration || "99",
      };

      // Get PDF definition
      const docDef = generateStatutsPdfDefinition(companyData);

      // Create PDF
      const pdfDoc = pdfMake.createPdf(docDef);

      // Convert to base64 and create URL
      pdfDoc.getBase64((data) => {
        const url = `data:application/pdf;base64,${data}`;
        setPdfUrl(url);

        // Save the PDF URL to the context
        updateStep(11, {
          pdfGenerated: true,
          pdfUrl: url,
          sentToYousign: false,
        });

        setIsGenerating(false);
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      setError(
        t(
          "PDF_GENERATION_ERROR",
          "Une erreur est survenue lors de la génération du PDF. Veuillez réessayer."
        )
      );
      setIsGenerating(false);
    }
  };

  const handleSendToYousign = async () => {
    try {
      setIsSending(true);
      setError(null);
      // posthog.capture("electronic_signature_send_yousign_clicked");

      if (!pdfUrl) {
        setError(
          t("PLEASE_GENERATE_PDF_FIRST", "Veuillez d'abord générer le PDF.")
        );
        setIsSending(false);
        return;
      }

      // Simulate sending to Yousign
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update state
      updateStep(11, {
        pdfGenerated: true,
        sentToYousign: true,
        pdfUrl: pdfUrl,
        signatureDate: new Date().toISOString(),
      });

      // posthog.capture("electronic_signature_sent_to_yousign_success");

      // Show success alert
      alert(
        t(
          "DOC_SENT_TO_YOUSIGN",
          "Les documents ont été envoyés à Yousign pour signature."
        )
      );
      setIsSending(false);
    } catch (error) {
      console.error("Error sending to Yousign:", error);
      setError(
        t(
          "YOUSIGN_ERROR",
          "Une erreur est survenue lors de l'envoi à Yousign. Veuillez réessayer."
        )
      );
      setIsSending(false);
    }
  };

  const handleBack = () => {
    // Save current state before going back
    if (pdfUrl) {
      updateStep(11, {
        pdfGenerated: true,
        pdfUrl: pdfUrl,
        sentToYousign: state.step11?.sentToYousign || false,
      });
    }

    // posthog.capture("electronic_signature_back_clicked");
    setCurrentStep(10);
  };

  const handleNext = () => {
    // Check if PDF has been generated and sent to Yousign
    if (!pdfUrl) {
      setError(
        t("PLEASE_GENERATE_PDF_FIRST", "Veuillez d'abord générer le PDF.")
      );
      return;
    }

    if (!state.step11?.sentToYousign) {
      setError(
        t(
          "PLEASE_SEND_TO_YOUSIGN",
          "Veuillez envoyer les documents à Yousign avant de continuer."
        )
      );
      return;
    }

    // posthog.capture("electronic_signature_next_clicked");
    setCurrentStep(12);
  };

  // Helper function to get month name
  function getMonthName(monthNumber) {
    const monthNames = t("MONTH_NAMES", {
      returnObjects: true,
      defaultValue: [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novembre",
        "décembre",
      ]
    });

    return monthNames[parseInt(monthNumber, 10) - 1] || "décembre";
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{t("ELECTRONIC_SIGNATURE", "Signature électronique")}</span>
          {state.step11?.sentToYousign ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-blue-500" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LanguageSwitcher />

        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">
            {t("IMPORTANT_POINTS", "Points importants :")}
          </h4>
          <ul className="text-sm text-yellow-700 list-disc pl-5 space-y-1">
            <li>
              {t(
                "LEGAL_VALUE",
                "La signature électronique a la même valeur légale qu'une signature manuscrite"
              )}
            </li>
            <li>
              {t(
                "VERIFY_INFO",
                "Vérifiez attentivement toutes les informations avant de signer"
              )}
            </li>
            <li>
              {t(
                "ALL_PARTNERS",
                "Tous les associés devront signer électroniquement les documents"
              )}
            </li>
          </ul>
        </div>

        {error && (
          <div className="bg-red-50 p-4 rounded-lg mb-6 text-red-700 text-sm">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 text-red-500" />
              <span>{error}</span>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Statutes Generation Section */}
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">
                {t("GENERATE_STATUTS", "Génération des statuts")}
              </h3>
              {pdfUrl && <CheckCircle className="h-5 w-5 text-green-500" />}
            </div>

            <Button
              onClick={handleGenerateStatuts}
              className="w-full flex items-center justify-center space-x-2"
              disabled={isGenerating}
            >
              <FileText className="h-5 w-5" />
              <span>
                {isGenerating
                  ? t("GENERATING", "Génération en cours...")
                  : t("GENERATE_STATUTS_BTN", "Générer les statuts")}
              </span>
            </Button>

            {pdfUrl && (
              <div className="mt-4">
                
                  href={pdfUrl}
                  download="Statuts.pdf"
                  className="flex items-center text-blue-600 hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {t("DOWNLOAD_STATUTS", "Télécharger les statuts")}
                </a>
              </div>
            )}
          </div>

          {/* Electronic Signature Section */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">
              {t("ELECTRONIC_SIGNATURE_SECTION", "Signature électronique")}
            </h3>

            <Button
              onClick={handleSendToYousign}
              className="w-full flex items-center justify-center space-x-2"
              disabled={!pdfUrl || isSending || state.step11?.sentToYousign}
              variant={!pdfUrl ? "outline" : "default"}
            >
              <Send className="h-5 w-5" />
              <span>
                {isSending
                  ? t("SENDING", "Envoi en cours...")
                  : state.step11?.sentToYousign
                  ? t("SENT_TO_YOUSIGN", "Envoyé pour signature")
                  : t("SEND_TO_YOUSIGN", "Envoyer pour signature via Yousign")}
              </span>
            </Button>

            {state.step11?.sentToYousign && (
              <div className="mt-4 p-3 bg-green-50 text-green-800 text-sm rounded-lg">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  <div>
                    <p className="font-medium">
                      {t("DOCUMENTS_SENT", "Documents envoyés")}
                    </p>
                    <p className="mt-1">
                      {t(
                        "CHECK_EMAIL",
                        "Vérifiez votre email pour compléter le processus de signature."
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!pdfUrl && (
              <p className="text-sm text-gray-500 mt-2">
                {t(
                  "GENERATE_FIRST",
                  "Veuillez d'abord générer les statuts avant de procéder à la signature"
                )}
              </p>
            )}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          <Button
            onClick={handleBack}
            className="bg-gray-500 text-white hover:bg-gray-600"
          >
            {t("BACK", "Retour")}
          </Button>
          <Button
            onClick={handleNext}
            className="bg-violet-600 text-white hover:bg-violet-700"
            disabled={!state.step11?.sentToYousign}
          >
            {t("CONTINUE", "Continuer")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ElectronicSignature;