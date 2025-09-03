import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JoinUsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "en" | "fa";
}

const translations = {
  en: {
    joinUs: "Join Us",
    profile: "Profile",
    name: "Name",
    lastName: "Last Name",
    age: "Age",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    education: "Education",
    location: "Location",
    resume: "Upload.Resume (PDF, max 15MB)",
    submit: "Submit",
    cancel: "Cancel",
    fileSizeError: "File size exceeds 15MB limit",
    fileTypeError: "Please upload a PDF file",
    successMessage: "Your application has been submitted successfully!",
    errorMessage: "Failed to send application. Please try again.",
  },
  fa: {
    joinUs: "به ما بپیوندید",
    profile: "پروفایل",
    name: "نام",
    lastName: "نام خانوادگی",
    age: "سن",
    gender: "جنسیت",
    male: "مرد",
    female: "زن",
    other: "سایر",
    education: "تحصیلات",
    location: "موقعیت",
    resume: "آپلود رزومه (PDF، حداکثر ۱۵ مگابایت)",
    submit: "ارسال",
    cancel: "لغو",
    fileSizeError: "حجم فایل از حد مجاز ۱۵ مگابایت بیشتر است",
    fileTypeError: "لطفاً فایل PDF آپلود کنید",
    successMessage: "درخواست شما با موفقیت ارسال شد!",
    errorMessage: "ارسال درخواست ناموفق بود. لطفاً دوباره امتحان کنید.",
  },
};

const modalVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

export default function JoinUsModal({ isOpen, onClose, lang }: JoinUsModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    age: "",
    gender: "",
    education: "",
    location: "",
  });
  const [resume, setResume] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        setError(translations[lang].fileSizeError);
        setResume(null);
        return;
      }
      if (file.type !== "application/pdf") {
        setError(translations[lang].fileTypeError);
        setResume(null);
        return;
      }
      setError("");
      setResume(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      // Simulate sending email with form data and resume
      // In a real app, this would use a backend service like EmailJS or a server endpoint
      const form = new FormData();
      form.append("name", formData.name);
      form.append("lastName", formData.lastName);
      form.append("age", formData.age);
      form.append("gender", formData.gender);
      form.append("education", formData.education);
      form.append("location", formData.location);
      if (resume) form.append("resume", resume);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(translations[lang].successMessage);
      setFormData({ name: "", lastName: "", age: "", gender: "", education: "", location: "" });
      setResume(null);
    } catch (err) {
      setError(translations[lang].errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 w-full max-w-md mx-4 shadow-xl"
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ direction: lang === "fa" ? "rtl" : "ltr" }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{translations[lang].joinUs}</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-6 h-6 text-gray-700" />
                <span className="sr-only">{translations[lang].cancel}</span>
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {translations[lang].profile}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={translations[lang].name}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder={translations[lang].lastName}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500"
                  required
                />
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder={translations[lang].age}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500"
                  required
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500"
                  required
                >
                  <option value="">{translations[lang].gender}</option>
                  <option value="male">{translations[lang].male}</option>
                  <option value="female">{translations[lang].female}</option>
                  <option value="other">{translations[lang].other}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {translations[lang].education}
                </label>
                <textarea
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  placeholder={translations[lang].education}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {translations[lang].location}
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder={translations[lang].location}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {translations[lang].resume}
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="cursor-pointer flex items-center gap-2 p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    <Upload className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-600">
                      {resume ? resume.name : translations[lang].resume}
                    </span>
                  </label>
                </div>
                {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                {success && <p className="text-sm text-green-500 mt-1">{success}</p>}
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  {translations[lang].cancel}
                </Button>
                <Button
                  type="submit"
                  className="bg-gray-900 text-white hover:bg-gray-800"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : translations[lang].submit}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}