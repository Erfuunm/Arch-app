import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import JSZip from "jszip";

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
    resume: "Upload Resume (PDF, max 2MB)",
    submit: "Submit",
    cancel: "Cancel",
    fileSizeError: "File size exceeds 2MB limit",
    fileTypeError: "Please upload a PDF file",
    compressing: "Compressing file...",
    fileTooLargeForEmail: "The uploaded file is too large after compression (must be under ~7MB after encoding). Please use a smaller file or contact support.",
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
    resume: "آپلود رزومه (PDF، حداکثر ۲ مگابایت)",
    submit: "ارسال",
    cancel: "لغو",
    fileSizeError: "حجم فایل از حد مجاز ۲ مگابایت بیشتر است",
    fileTypeError: "لطفاً فایل PDF آپلود کنید",
    compressing: "در حال فشرده‌سازی فایل...",
    fileTooLargeForEmail: "فایل آپلود شده پس از فشرده‌سازی بیش از حد بزرگ است (باید زیر ۷ مگابایت پس از رمزگذاری باشد). لطفاً از فایل کوچک‌تر استفاده کنید یا با پشتیبانی تماس بگیرید.",
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
  const [resumeType, setResumeType] = useState<"PDF" | "ZIP">("PDF");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(`Original file size: ${(file.size / (1024 * 1024)).toFixed(2)} MB`);
      if (file.size > 2 * 1024 * 1024) {
        setError(translations[lang].fileSizeError);
        setResume(null);
        setResumeType("PDF");
        return;
      }
      if (file.type !== "application/pdf") {
        setError(translations[lang].fileTypeError);
        setResume(null);
        setResumeType("PDF");
        return;
      }

      // Compress to ZIP if file > 50KB
      if (file.size > 50 * 1024) {
        setIsCompressing(true);
        setError("");
        try {
          const zip = new JSZip();
          zip.file("resume.pdf", file);
          const zippedBlob = await zip.generateAsync({ type: "blob" });
          const zippedFile = new File([zippedBlob], `${file.name.replace('.pdf', '')}_resume.zip`, { type: "application/zip" });
          console.log(`Zipped file size: ${(zippedFile.size / (1024 * 1024)).toFixed(2)} MB`);
          setResume(zippedFile);
          setResumeType("ZIP");
          setError("");
        } catch (zipError) {
          console.error("ZIP compression failed:", zipError);
          setError(translations[lang].errorMessage);
          setResume(null);
          setResumeType("PDF");
        } finally {
          setIsCompressing(false);
        }
      } else {
        setError("");
        setResume(file);
        setResumeType("PDF");
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    if (!resume) {
      setError("Please upload a resume.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare form data for EmailJS
      const emailData = {
        name: formData.name,
        lastName: formData.lastName,
        age: formData.age,
        gender: formData.gender,
        education: formData.education,
        location: formData.location,
        time: new Date().toLocaleString("en-US", { timeZone: "Asia/Dubai" }),
        to_email: "arman.mizban@gmail.com",
        resume: await fileToBase64(resume),
        resume_type: resumeType, // Add resume_type for template
      };

      // Log payload size for debugging
      const payloadSize = JSON.stringify(emailData).length + (resume ? resume.size * 1.33 : 0);
      console.log(`Estimated total payload size: ${(payloadSize / (1024 * 1024)).toFixed(2)} MB`);

      // Initialize EmailJS with your public key
      emailjs.init("yQNgJvnMJz3uvtDd4");

      // Send email with form data
      const response = await emailjs.send(
        "service_h13d4wx",
        "template_j2w6v3c",
        emailData
      );

      console.log("EmailJS response:", response);

      setSuccess(translations[lang].successMessage);
      setFormData({ name: "", lastName: "", age: "", gender: "", education: "", location: "" });
      setResume(null);
      setResumeType("PDF");
    } catch (err: any) {
      console.error("EmailJS error:", err);
      if (err?.status === 413) {
        setError(translations[lang].fileTooLargeForEmail);
      } else {
        setError(translations[lang].errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Utility function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        console.log(`Base64 size: ${(result.length / (1024 * 1024)).toFixed(2)} MB`);
        resolve(result);
      };
      reader.onerror = (error) => reject(error);
    });
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
                    disabled={isCompressing}
                  />
                  <label
                    htmlFor="resume-upload"
                    className="cursor-pointer flex items-center gap-2 p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    <Upload className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-600">
                      {isCompressing ? translations[lang].compressing : (resume ? resume.name : translations[lang].resume)}
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
                  disabled={isSubmitting || isCompressing}
                >
                  {translations[lang].cancel}
                </Button>
                <Button
                  type="submit"
                  className="bg-gray-900 text-white hover:bg-gray-800"
                  disabled={isSubmitting || isCompressing || !resume}
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