import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, CheckCircle, Loader2, RefreshCw, Upload, Users, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";

const FaceRecognition = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [recognizing, setRecognizing] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<null | {
    success: boolean;
    message: string;
    students?: { id: string; name: string; time: string }[];
  }>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [studentId, setStudentId] = useState(user?.id || "");
  const [saving, setSaving] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio: false,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      
      setIsCapturing(true);
      setCapturedImage(null);
      setRecognitionResult(null);
    } catch (err) {
      toast.error("Failed to access camera. Please check permissions.");
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsCapturing(false);
  };

  const captureImage = () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const image = canvas.toDataURL("image/png");
      setCapturedImage(image);
      stopCamera();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCapturedImage(event.target.result as string);
        setIsCapturing(false);
        setRecognitionResult(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const resetCapture = () => {
    setCapturedImage(null);
    setRecognitionResult(null);
    startCamera();
  };

  const recognizeFaces = () => {
    if (!capturedImage) return;
    
    setRecognizing(true);
    
    // Simulate API call for face recognition
    setTimeout(() => {
      // Mock success response
      setRecognitionResult({
        success: true,
        message: "Successfully recognized 3 students",
        students: [
          { id: "STU-1001", name: "Jane Smith", time: "10:02 AM" },
          { id: "STU-1042", name: "Michael Johnson", time: "10:02 AM" },
          { id: "STU-1053", name: "Emily Davis", time: "10:02 AM" },
        ]
      });
      setRecognizing(false);
      toast.success("Attendance marked successfully for 3 students");
    }, 2000);
  };

  const saveFacePhoto = async () => {
    if (!capturedImage) {
      toast.error("No photo captured");
      return;
    }
    if (!name || !studentId) {
      toast.error("Name and ID are required");
      return;
    }
    setSaving(true);
    try {
      const res = await axios.post("http://localhost:5000/save-face-photo", {
        userId: studentId,
        photo: capturedImage,
        name,
      });
      if (res.data && res.data.message) {
        toast.success(res.data.message);
      } else {
        toast.success("Photo saved successfully");
      }
    } catch (err) {
      toast.error("Failed to save photo");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    startCamera();
    
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold">Face Registration</h1>
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Name</label>
          <input
            className="input input-bordered"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your name"
            disabled={!!user?.name}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Student ID</label>
          <input
            className="input input-bordered"
            type="text"
            value={studentId}
            onChange={e => setStudentId(e.target.value)}
            placeholder="Enter your student ID"
            disabled={!!user?.id}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Capture or Upload Image</CardTitle>
            <CardDescription>
              Capture a photo using webcam or upload an image to mark attendance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative w-full aspect-video bg-muted flex items-center justify-center rounded-md overflow-hidden">
                {isCapturing ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : capturedImage ? (
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Camera className="h-12 w-12 mb-2" />
                    <p>No image captured</p>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {isCapturing ? (
                  <Button onClick={captureImage}>
                    <Camera className="mr-2 h-4 w-4" />
                    Capture
                  </Button>
                ) : capturedImage ? (
                  <Button onClick={resetCapture}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retake
                  </Button>
                ) : (
                  <Button onClick={startCamera}>
                    <Camera className="mr-2 h-4 w-4" />
                    Start Camera
                  </Button>
                )}
                
                <Button variant={isCapturing ? "secondary" : "default"} asChild>
                  <label className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden" 
                    />
                  </label>
                </Button>
                
                {capturedImage && !recognitionResult && (
                  <Button 
                    onClick={recognizeFaces} 
                    disabled={recognizing}
                  >
                    {recognizing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Users className="mr-2 h-4 w-4" />
                        Recognize Faces
                      </>
                    )}
                  </Button>
                )}
                {capturedImage && (
                  <Button onClick={saveFacePhoto} disabled={saving}>
                    {saving ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle className="mr-2 h-4 w-4" />
                    )}
                    Save Photo
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Recognition Results</CardTitle>
            <CardDescription>
              {recognitionResult 
                ? recognitionResult.success 
                  ? recognitionResult.message 
                  : "No students recognized"
                : "Capture an image to see recognition results"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recognizing ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-lg">Recognizing faces...</p>
                <p className="text-sm text-muted-foreground">Please wait a moment</p>
              </div>
            ) : recognitionResult?.success ? (
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Attendance marked successfully</span>
                </div>
                
                <div className="border rounded-md divide-y">
                  <div className="grid grid-cols-3 p-3 font-medium bg-muted/50">
                    <div>ID</div>
                    <div>Name</div>
                    <div>Time</div>
                  </div>
                  
                  {recognitionResult.students?.map((student, idx) => (
                    <div key={idx} className="grid grid-cols-3 p-3">
                      <div>{student.id}</div>
                      <div>{student.name}</div>
                      <div>{student.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : !capturedImage ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Camera className="h-12 w-12 mb-4" />
                <p className="text-center">
                  Capture or upload an image to start face recognition
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <X className="h-12 w-12 mb-4" />
                <p className="text-center">
                  No recognition results yet. Click "Recognize Faces" to process the image.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FaceRecognition;
