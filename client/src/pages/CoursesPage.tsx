import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { portfolioData } from '@/data/portfolioData';
import { ArrowLeft, BookOpen, ExternalLink, X, FileText, Image } from 'lucide-react';
import { useState } from 'react';

// Modal component for displaying certificates
const CertificateModal = ({ 
  isOpen, 
  onClose, 
  certificates, 
  courseName 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  certificates: string[]; 
  courseName: string;
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-4xl w-full max-h-[90vh] overflow-auto bg-gray-900 rounded-2xl border border-gray-700 p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">{courseName}</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Certificates */}
          <div className="space-y-6">
            {certificates.map((cert, index) => {
              const isPdf = cert.endsWith('.pdf');
              return (
                <div key={index} className="rounded-xl overflow-hidden border border-gray-700">
                  {isPdf ? (
                    <div className="flex flex-col items-center p-8 bg-gray-800/50">
                      <FileText className="w-16 h-16 text-green-400 mb-4" />
                      <p className="text-gray-300 mb-4">PDF 文件 {index + 1}</p>
                      <a
                        href={cert}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        開啟 PDF
                      </a>
                    </div>
                  ) : (
                    <img
                      src={cert}
                      alt={`Certificate ${index + 1}`}
                      className="w-full h-auto"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<{ name: string; certificates: string[] } | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-gray-800/50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-mono text-sm">Back to Home</span>
            </a>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/projects"><a className="text-gray-500 hover:text-cyan-400 transition-colors text-sm font-mono">Projects</a></Link>
            <Link href="/competitions"><a className="text-gray-500 hover:text-yellow-400 transition-colors text-sm font-mono">Competitions</a></Link>
            <Link href="/certificates"><a className="text-gray-500 hover:text-purple-400 transition-colors text-sm font-mono">Certificates</a></Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
              <BookOpen className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Courses</h1>
              <p className="text-gray-500 font-mono text-sm mt-1">// {portfolioData.courses.length} entries</p>
            </div>
          </motion.div>

          {/* Courses List */}
          <div className="space-y-6">
            {portfolioData.courses.map((course, index) => {
              const hasCertificates = course.certificates && course.certificates.length > 0;
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                  onClick={() => hasCertificates && setSelectedCourse({ name: course.name, certificates: course.certificates! })}
                  className={`group p-6 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-green-500/30 transition-all ${hasCertificates ? 'cursor-pointer' : ''}`}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-green-300 transition-colors">
                          {course.name}
                        </h3>
                        {hasCertificates && (
                          <span className="px-2 py-1 text-xs font-mono rounded bg-green-500/20 text-green-300 flex items-center gap-1">
                            <Image className="w-3 h-3" />
                            {course.certificates!.length} 證書
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{course.institution}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-gray-500 text-sm font-mono">{course.grade}</span>
                        <span className={`px-2 py-1 text-xs font-mono rounded ${
                          course.status === 'completed' 
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {course.status === 'completed' ? 'Completed' : 'In Progress'}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Certificate Modal */}
      {selectedCourse && (
        <CertificateModal
          isOpen={!!selectedCourse}
          onClose={() => setSelectedCourse(null)}
          certificates={selectedCourse.certificates}
          courseName={selectedCourse.name}
        />
      )}
    </div>
  );
}
