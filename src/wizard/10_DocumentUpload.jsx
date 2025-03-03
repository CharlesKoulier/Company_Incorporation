import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Paperclip,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCompany } from "../CompanyContext";
import LanguageSwitcher from "../components/LanguageSwitcher";

const DocumentUpload = () => {
  const { t } = useTranslation();
  const { state, updateStep, setCurrentStep } = useCompany();
  const [files, setFiles] = useState(state.step10?.uploadedDocuments || {});
  const [dragging, setDragging] = useState(false);

  // List of required documents
  const requiredDocuments = [
    {
      id: "identity",
      name: t("IDENTITY_PROOF", "Pièce d'identité"),
      description: t(
        "IDENTITY_DESCRIPTION",
        "Carte d'identité ou passeport valide"
      ),
    },
    {
      id: "addressProof",
      name: t("ADDRESS_PROOF", "Justificatif de domicile"),
      description: t(
        "ADDRESS_DESCRIPTION",
        "Moins de 3 mois (facture EDF, internet...)"
      ),
    },
    {
      id: "bankDetails",
      name: t("BANK_DETAILS", "RIB"),
      description: t(
        "BANK_DESCRIPTION",
        "Relevé d'identité bancaire au nom de l'entreprise"
      ),
    },
    {
      id: "capitalDeposit",
      name: t("CAPITAL_DEPOSIT", "Attestation de dépôt du capital"),
      description: t("CAPITAL_DESCRIPTION", "Document fourni par votre banque"),
    },
  ];

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e, documentId) => {
    e.preventDefault();
    setDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0], documentId);
    }
  };

  // Handle file upload
  const handleFileChange = (e, documentId) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0], documentId);
    }
  };

  const handleFileUpload = (file, documentId) => {
    // Simulate file upload
    const reader = new FileReader();

    reader.onload = () => {
      setFiles((prevFiles) => ({
        ...prevFiles,
        [documentId]: {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          // In a real application, you would store the file URL after uploading it to the server
          // Here, we just store the metadata for simulation
        },
      }));

      // posthog.capture("document_uploaded", { documentType: documentId });
    };

    reader.readAsDataURL(file);
  };

  const removeFile = (documentId) => {
    const newFiles = { ...files };
    delete newFiles[documentId];
    setFiles(newFiles);
    // posthog.capture("document_removed", { documentType: documentId });
  };

  const handleContinue = () => {
    updateStep(10, {
      uploadedDocuments: files,
      isComplete: Object.keys(files).length === requiredDocuments.length,
    });

    // posthog.capture("document_upload_completed", {
    //   documentCount: Object.keys(files).length,
    //   isComplete: Object.keys(files).length === requiredDocuments.length
    // });

    setCurrentStep(11);
  };

  const handleBack = () => {
    // Save already uploaded files
    updateStep(10, {
      uploadedDocuments: files,
      isComplete: Object.keys(files).length === requiredDocuments.length,
    });
    // posthog.capture("document_upload_back_clicked");
    setCurrentStep(9);
  };

  const allDocumentsUploaded =
    Object.keys(files).length === requiredDocuments.length;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{t("DOCUMENT_UPLOAD", "Téléchargement des documents")}</span>
          {allDocumentsUploaded ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LanguageSwitcher />

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h4 className="text-sm font-medium text-blue-800 mb-2">
            {t("DOCUMENT_REQUIREMENTS", "Exigences pour les documents :")}
          </h4>
          <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
            <li>{t("CLEAR_SCAN", "Scan clair et lisible")}</li>
            <li>{t("FILE_FORMATS", "Formats acceptés : PDF, JPG, PNG")}</li>
            <li>{t("FILE_SIZE", "Taille maximale par fichier : 5 Mo")}</li>
            <li>
              {t(
                "VALID_DOCUMENTS",
                "Les documents doivent être valides et non expirés"
              )}
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          {requiredDocuments.map((doc) => (
            <div key={doc.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{doc.name}</h3>
                  <p className="text-sm text-gray-500">{doc.description}</p>
                </div>
                {files[doc.id] ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : null}
              </div>

              {files[doc.id] ? (
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded mt-2">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-gray-600" />
                    <span className="text-sm truncate max-w-xs">
                      {files[doc.id].name}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(doc.id)}
                    className="text-red-500 h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center mt-2 ${
                    dragging ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, doc.id)}
                >
                  <input
                    type="file"
                    id={`file-${doc.id}`}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, doc.id)}
                  />
                  <label
                    htmlFor={`file-${doc.id}`}
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm font-medium">
                      {t(
                        "CLICK_OR_DROP",
                        "Cliquez ou glissez-déposez un fichier"
                      )}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {t("SUPPORTED_FORMATS", "PDF, JPG ou PNG (max 5 Mo)")}
                    </p>
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <Button
            onClick={handleBack}
            className="bg-gray-500 text-white hover:bg-gray-600"
          >
            {t("BACK", "Retour")}
          </Button>
          <Button
            onClick={handleContinue}
            className="bg-violet-600 text-white hover:bg-violet-700"
            disabled={!allDocumentsUploaded}
          >
            {t("CONTINUE", "Continuer")}
          </Button>
        </div>

        {!allDocumentsUploaded && (
          <p className="text-center text-sm text-red-500 mt-4">
            {t(
              "UPLOAD_ALL_DOCUMENTS",
              "Veuillez télécharger tous les documents requis avant de continuer."
            )}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;
