import { useState, useEffect } from "react";

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const toast = ({
    title,
    description,
    variant = "default",
    duration = 3000,
  }) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((currentToasts) => [
      ...currentToasts,
      { id, title, description, variant, duration },
    ]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.duration !== 0)
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return { toast };
}

// Exporter un objet toast avec une méthode par défaut
export const toast = {
  error: (message) => {
    const { toast: showToast } = useToast();
    showToast({
      title: "Erreur",
      description: message,
      variant: "destructive",
    });
  },
  success: (message) => {
    const { toast: showToast } = useToast();
    showToast({
      title: "Succès",
      description: message,
      variant: "default",
    });
  },
};
