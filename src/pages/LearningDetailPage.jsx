import { useState, useEffect } from "react";
import {
  BookOpen,
  Sparkles,
  Plus,
  Brain,
  X,
  Trash2,
  RotateCcw,
  ArrowLeft,
  FileText,
  Video,
  Type,
  File,
  DownloadCloud,
  Loader2,
  Book,
  HelpCircle,
  AlignLeft,
  UploadCloud,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  createContentLearningApi,
  deleteContentLearningApi,
  generateAnalysisLearningApi,
  getDetailLearningApi,
  getGenerateAnalysisLearningApi,
  getListContentLearningApi,
} from "@/api/LearningApi";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

export const LearningDetailPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const [isUploading, setIsUploading] = useState(false);

  const [room, setRoom] = useState(null);
  const [contents, setContents] = useState([]);
  const [_, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const [isContentModalOpen, setIsContentModalOpen] = useState(false);

  const [contentFile, setContentFile] = useState(null);

  const [analysisState, setAnalysisState] = useState("idle");
  // idle | generating | done | error

  const [analysisResult, setAnalysisResult] = useState(null);

  const convertDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleDeleteContent = async (id) => {
    try {
      await deleteContentLearningApi(roomId, id);
      toast.success("Berhasil Hapus Content");
      setContents((prev) => prev.filter((p) => p.id != id));
    } catch {
      toast.error("Gagal Menghapus Content");
    }
  };

  const handleCreateContent = async () => {
    if (!contentFile || isUploading) return;

    const formData = new FormData();
    formData.append("file", contentFile);

    try {
      setIsUploading(true);
      const data = await createContentLearningApi(roomId, formData);
      // convertDate
      const contentData = {
        id: data.data.id,
        filePath: data.data.filePath,
        fileSize: data.data.fileSize,
        fileUrl: data.data.fileUrl,
        learningSpaceId: data.data.learningSpaceId,
        mimeType: data.data.mimeType,
        type: data.data.type,
        duration: data.data.duration,
        title: data.data.title,
        createdAt: convertDate(new Date()),
      };
      setContents((prev) => [...prev, contentData]);
      toast.success("Berhasil Upload Materi");
    } catch {
      toast.error("Gagal Upload Materi");
    } finally {
      setIsUploading(false);
    }

    setContentFile(null);
    setIsContentModalOpen(false);
  };

  const handleOpen = async () => {
    setContentFile(null);
    setIsContentModalOpen(true);
  };

  const handleGenerateRoomInsight = async () => {
    try {
      setAnalysisState("generating");

      // 🔥 SIMULASI API AI (nanti ganti API beneran)
      await new Promise((res) => setTimeout(res, 2500));

      const data = await generateAnalysisLearningApi(roomId);
      console.log(data);

      const result = {
        markdown: data.data.content,
      };

      setAnalysisResult(result);
      setAnalysisState("done");
    } catch (err) {
      setAnalysisState("error");
      toast.error("Gagal generate analisis");
    }
  };

  const handleRegenerate = () => {
    setAnalysisResult(null);
    handleGenerateRoomInsight();
  };

  const getContentIcon = (type) => {
    if (type === "pdf")
      return <FileText size={20} className="text-orange-500" />;
    if (type === "video") return <Video size={20} className="text-rose-500" />;
    if (type === "text") return <Type size={20} className="text-blue-500" />;
    return <File size={20} className="text-slate-500" />;
  };

  const getContentBg = (type) => {
    if (type === "pdf") return "bg-orange-50 border-orange-100";
    if (type === "video") return "bg-rose-50 border-rose-100";
    if (type === "text") return "bg-blue-50 border-blue-100";
    return "bg-slate-50 border-slate-100";
  };

  const loadLearningDetail = async () => {
    try {
      setLoading(true);
      const roomRes = await getDetailLearningApi(roomId);
      const contentRes = await getListContentLearningApi(roomId);
      setRoom(roomRes.data);
      setContents(
        contentRes.data.map((c) => ({
          id: c.id,
          filePath: c.file_path,
          fileSize: c.file_size,
          fileUrl: c.file_url,
          learningSpaceId: c.learning_space_id,
          mimeType: c.mime_type,
          type: c.type,
          duration: c.duration,
          title: c.title,
          createdAt: convertDate(c.created_at),
        })),
      );
    } catch {
      toast.error("Gagal memuat detail ruang belajar");
    } finally {
      setLoading(false);
    }
  };

  const getTypeFromFile = (file) => {
    if (!file) return null;

    if (file.type === "application/pdf") return "pdf";
    if (file.type.startsWith("video/")) return "video";
    return "file";
  };

  const formatFileSize = (bytes = 0) => {
    if (bytes === 0) return "0 B";

    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  };

  const loadRoomAnalysis = async () => {
    try {
      const res = await getGenerateAnalysisLearningApi(roomId);

      if (res.data?.content) {
        setAnalysisResult({
          markdown: res.data.content,
        });
        setAnalysisState("done");
      } else {
        setAnalysisState("idle");
      }
    } catch {
      setAnalysisState("idle");
    }
  };

  useEffect(() => {
    loadLearningDetail();
    loadRoomAnalysis();
  }, []);

  console.log(contents);

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-300 p-8">
      {/* Header Detail */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/learning")}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium mb-4 transition-colors"
        >
          <ArrowLeft size={18} /> Kembali
        </button>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{room?.title}</h1>
            <p className="text-slate-500 mt-1 max-w-2xl">{room?.description}</p>
          </div>
          <button
            onClick={handleOpen}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200 shrink-0"
          >
            <Plus size={18} /> Upload Materi
          </button>
        </div>
      </div>

      {/* List Materi */}
      <div className="space-y-3 mb-8">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
          Daftar Materi ({contents.length})
        </h3>
        {contents.length > 0 ? (
          contents.map((item) => (
            <div
              key={item.id}
              className="group flex items-center bg-white p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-sm transition-all"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mr-4 ${getContentBg(item.type)}`}
              >
                {getContentIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-800 text-sm mb-1 truncate">
                  {item.title}
                </h4>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{item.type.toUpperCase()}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span>{formatFileSize(item.fileSize)}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span>{item.createdAt}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <DownloadCloud size={18} />
                </button>
                <button
                  onClick={() => handleDeleteContent(item.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-400 text-sm">
              Belum ada materi. Upload sesuatu untuk memulai!
            </p>
          </div>
        )}
      </div>

      {analysisState === "idle" && (
        <div className="bg-linear-to-br from-indigo-50 to-violet-50 rounded-2xl border border-indigo-100 p-6 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-indigo-500">
            <Brain size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            Analisis Cerdas Ruang Belajar
          </h3>
          <p className="text-slate-500 text-sm mb-6">
            AI akan membaca seluruh materi dan menyusun rangkuman.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
                disabled={contents.length === 0}
                onClick={handleGenerateRoomInsight}
                className={`
                  px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all
                  ${
                    contents.length === 0
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg hover:shadow-indigo-200'
                  }
                `}
              >
                <Sparkles size={16} />
                Analisis Konten
              </button>


          </div>
          {contents.length === 0 && (
            <p className="mt-3 text-xs text-slate-400">
              Upload minimal 1 materi untuk mengaktifkan analisis AI
            </p>
          )}
        </div>
      )}

      {analysisState === "generating" && (
        <div className="w-full py-12 bg-white border border-indigo-100 rounded-2xl flex flex-col items-center">
          <Loader2 size={36} className="animate-spin text-indigo-600 mb-4" />
          <h3 className="font-bold text-slate-800">
            Sedang menganalisis konten...
          </h3>
          <p className="text-sm text-slate-500">
            AI sedang membaca semua materi
          </p>
        </div>
      )}

      {analysisState === "done" && analysisResult && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          {/* HEADER */}
          <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
            <div className="flex items-center gap-2">
              <Brain size={20} className="text-yellow-300" />
              <h3 className="font-bold">Hasil Analisis AI</h3>
            </div>
            <button
              onClick={handleRegenerate}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30"
              title="Generate ulang"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          {/* BODY */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <MarkdownRenderer content={analysisResult.markdown} />
          </div>
        </div>
      )}

      {/* Modal Upload (No Change) */}
      {isContentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800">
                Upload Materi
              </h3>
              <button onClick={() => setIsContentModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* BODY */}
            <div className="p-6">
              {/* DROPZONE */}
              <label
                className={`group ${isUploading ? "pointer-events-none opacity-70" : "cursor-pointer"}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);

                  const file = e.dataTransfer.files?.[0];
                  if (file) setContentFile(file);
                }}
              >
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setContentFile(e.target.files[0])}
                />

                <div
                  className={`flex flex-col items-center justify-center gap-4 
                        h-64 rounded-2xl border-2 border-dashed transition-all
                        ${
                          isDragging
                            ? "border-indigo-600 bg-indigo-100 scale-[1.02]"
                            : contentFile
                              ? "border-indigo-500 bg-indigo-50"
                              : "border-slate-300 hover:border-indigo-400 hover:bg-slate-50"
                        }
                      `}
                >
                  {/* ICON */}
                  <div className="w-16 h-16 rounded-full bg-white shadow flex items-center justify-center">
                    {contentFile ? (
                      getContentIcon(getTypeFromFile(contentFile))
                    ) : (
                      <UploadCloud size={32} className="text-indigo-500" />
                    )}
                  </div>

                  {/* TEXT */}
                  {!contentFile ? (
                    <>
                      <p className="text-sm font-bold text-slate-700">
                        Klik atau drop file di sini
                      </p>
                      <p className="text-xs text-slate-400">
                        PDF, Video, atau dokumen lainnya
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-bold text-slate-800 text-center px-4 truncate max-w-full">
                        {contentFile.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {formatFileSize(contentFile.size)}
                      </p>
                    </>
                  )}
                </div>
              </label>

              {/* ACTION */}
              <button
                disabled={!contentFile || isUploading}
                onClick={handleCreateContent}
                className="mt-6 w-full py-3 rounded-xl font-bold transition-all
                      bg-indigo-600 text-white hover:bg-indigo-700
                      disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
              >
                Upload Materi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
