import React, { useState, useEffect, useRef } from 'react';
import { AppStage, DogMessage, SecurityLog } from './types';
import { generateDogBirthdaySpeech } from './services/geminiService';
import { Typewriter } from './components/Typewriter';
import { Confetti } from './components/Confetti';
import { SausageDog } from './components/SausageDog';
import { Lock, Fingerprint, PartyPopper, Heart, Bone, ShieldCheck, Terminal, ScanFace, Sparkles, Dog, PawPrint } from 'lucide-react';

// 指向 public 文件夹下的图片
// 必须确保你把照片重命名为 birthday-dog.jpg 并放在 public 文件夹内
const DOG_IMAGE_URL = "/birthday-dog.jpg";

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.LOCKED);
  const [logs, setLogs] = useState<SecurityLog[]>([]);
  const [message, setMessage] = useState<DogMessage | null>(null);
  
  // Interaction State
  const [petProgress, setPetProgress] = useState(0);
  const [clicks, setClicks] = useState<{id: number, x: number, y: number, text: string}[]>([]);
  const [imageError, setImageError] = useState(false);

  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Preload Gemini message
    generateDogBirthdaySpeech().then(setMessage);
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Stage 2: Interaction Logic
  const handlePet = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (stage !== AppStage.VERIFYING) return;

    // Get click coordinates for floating text
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const dogThoughts = ["舒服~", "左边点!", "这就是妈妈的味道", "力度不错", "快好了...", "汪!", "28岁的香味", "想吃蛋糕"];
    const randomThought = dogThoughts[Math.floor(Math.random() * dogThoughts.length)];

    const newClick = { id: Date.now(), x, y, text: randomThought };
    setClicks(prev => [...prev, newClick]);
    
    // Remove click effect after animation
    setTimeout(() => {
      setClicks(prev => prev.filter(c => c.id !== newClick.id));
    }, 1000);

    // Increment progress
    const newProgress = Math.min(petProgress + 8, 100); // ~13 clicks to finish
    setPetProgress(newProgress);

    // Trigger logs based on progress
    if (newProgress > 20 && logs.length === 0) addLog("检测到熟悉的抚摸手法...", 'success');
    if (newProgress > 50 && logs.length === 1) addLog("气味样本采集完毕：是妈妈！", 'success');
    if (newProgress > 80 && logs.length === 2) addLog("年龄扫描：28岁 (成熟度: 完美)", 'success');
    
    if (newProgress >= 100) {
      setTimeout(() => completeVerification(), 500);
    }
  };

  const addLog = (text: string, status: SecurityLog['status'] = 'pending') => {
    setLogs(prev => [...prev, { id: Date.now(), text, status }]);
  };

  const startVerification = () => {
    setStage(AppStage.VERIFYING);
  };

  const completeVerification = async () => {
    addLog("验证通过！正在释放寿星...", 'success');
    await new Promise(r => setTimeout(r, 800));
    setStage(AppStage.REVEAL);
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 overflow-hidden flex items-center justify-center relative ${stage === AppStage.REVEAL ? 'bg-[#FFF5F7]' : 'bg-neutral-900'}`}>
      
      {/* Dynamic Paw Print Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
         {Array.from({ length: 12 }).map((_, i) => (
            <div 
                key={i} 
                className="absolute text-current"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                    color: stage === AppStage.REVEAL ? '#ec4899' : '#10b981'
                }}
            >
                <PawPrint size={32} />
            </div>
         ))}
      </div>

      {/* Background Tech Elements (Dark Mode) */}
      {stage !== AppStage.REVEAL && (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 text-emerald-500"><ScanFace size={64} /></div>
          <div className="absolute bottom-20 right-20 text-emerald-500"><Fingerprint size={120} /></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-emerald-900/30 rounded-full animate-pulse" />
        </div>
      )}

      <div className="w-full max-w-md mx-auto p-6 relative z-10">
        
        {/* STAGE 1: LOCKED (The Gatekeeper) */}
        {stage === AppStage.LOCKED && (
          <div className="text-center space-y-8 animate-fade-in relative">
            <div className="bg-neutral-800/90 backdrop-blur-md p-8 rounded-3xl border border-neutral-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
              
              {/* Dog Peek Animation */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-20 animate-wiggle z-20">
                 <SausageDog />
              </div>

              <div className="flex justify-center mb-6 mt-4">
                <div className="relative">
                    <div className="w-28 h-28 bg-red-900/40 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                      <Fingerprint size={48} className="text-red-500" />
                    </div>
                    <div className="absolute -bottom-3 -right-3 bg-neutral-900 border border-neutral-700 p-2 rounded-full">
                        <Lock size={18} className="text-neutral-400" />
                    </div>
                </div>
              </div>
              
              <h1 className="font-mono-custom text-3xl font-bold text-red-500 mb-2 tracking-widest">
                绝密档案
              </h1>
              <p className="text-neutral-400 font-mono-custom text-sm mb-8 tracking-wider leading-relaxed">
                代号：28根骨头<br/>
                访问权限：仅限妈妈
              </p>

              <button 
                onClick={startVerification}
                className="group relative w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-5 px-6 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-lg overflow-hidden border-b-4 border-emerald-800 hover:border-emerald-700"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 font-mono-custom text-xl tracking-wider">
                   <PawPrint className="animate-pulse" size={20} /> 点击开始验证
                </span>
              </button>
            </div>
            
            <div className="text-neutral-600 text-xs font-mono-custom uppercase flex items-center justify-center gap-2">
              <SausageDog className="w-12 h-6 opacity-50" />
              安全连接由“腊肠特工处”提供支持
            </div>
          </div>
        )}

        {/* STAGE 2: VERIFYING (Interactive Petting) */}
        {stage === AppStage.VERIFYING && (
          <div className="w-full bg-neutral-800 p-6 rounded-3xl border border-emerald-900 shadow-2xl min-h-[500px] flex flex-col relative overflow-hidden">
             {/* Scan line animation */}
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-[fall_3s_linear_infinite]" />
            
            <div className="flex items-center justify-between border-b border-neutral-700 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Terminal size={18} className="text-emerald-500" />
                <span className="text-emerald-500 text-sm tracking-widest">抚摸验证中...</span>
              </div>
              <div className="flex items-center gap-1">
                 <Bone size={14} className="text-emerald-500" />
                 <span className="text-emerald-500 font-mono-custom">{petProgress}%</span>
              </div>
            </div>

            {/* Interactive Area */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                <div className="relative w-full aspect-square max-w-[250px]">
                    <button 
                        onClick={handlePet}
                        className="w-full h-full rounded-full bg-neutral-900 border-4 border-dashed border-emerald-500/30 flex flex-col items-center justify-center hover:bg-neutral-900/80 active:scale-95 transition-all cursor-pointer relative overflow-hidden group"
                    >
                        {/* Progress Background - Growing Sausage Dog Color */}
                        <div 
                           className="absolute bottom-0 left-0 w-full bg-[#8B4513] transition-all duration-300 ease-out opacity-20"
                           style={{ height: `${petProgress}%` }}
                        />
                        
                        <div className="relative z-10 text-center pointer-events-none flex flex-col items-center">
                            {petProgress < 100 ? (
                                <>
                                    <div className="animate-bounce mb-2">
                                        <SausageDog className="w-24 h-12" />
                                    </div>
                                    <span className="text-emerald-400 text-sm font-bold tracking-wider mt-2">
                                        快速抚摸屏幕！
                                    </span>
                                </>
                            ) : (
                                <div className="text-emerald-400 flex flex-col items-center">
                                    <Heart size={48} className="animate-pulse text-red-500 fill-red-500" />
                                    <span className="mt-2 font-bold">验证成功！</span>
                                </div>
                            )}
                        </div>

                        {/* Floating Text Effects */}
                        {clicks.map(click => (
                            <div 
                                key={click.id}
                                className="absolute text-emerald-300 font-bold text-sm pointer-events-none animate-[ping_1s_ease-out_forwards]"
                                style={{ left: click.x, top: click.y }}
                            >
                                {click.text}
                            </div>
                        ))}
                    </button>
                </div>

                <div className="w-full space-y-2 h-24 overflow-hidden" ref={logContainerRef}>
                    {logs.map((log) => (
                        <div key={log.id} className="flex items-center gap-2 text-xs sm:text-sm animate-in slide-in-from-left">
                            <span className="text-emerald-600">➜</span>
                            <span className="text-emerald-400 font-mono-custom">{log.text}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        )}

        {/* STAGE 3: REVEAL (The Party) */}
        {stage === AppStage.REVEAL && (
          <div className="relative animate-in fade-in zoom-in duration-1000 slide-in-from-bottom-10">
            <Confetti />
            
            <div className="bg-white text-neutral-800 rounded-3xl shadow-2xl overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500 border-8 border-white">
              {/* Photo Area */}
              <div className="relative h-80 bg-pink-100 overflow-hidden group">
                 {!imageError ? (
                    <img 
                        src={DOG_IMAGE_URL} 
                        onError={() => setImageError(true)}
                        alt="Birthday Dog" 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[3s]"
                    />
                 ) : (
                    // Fallback illustration if image fails
                    <div className="w-full h-full flex flex-col items-center justify-center bg-pink-50 text-pink-300">
                        <Dog size={80} />
                        <span className="text-sm mt-2 font-hand">（假装这里是你的可爱修勾）</span>
                        <span className="text-xs mt-1 text-pink-200">请确保 birthday-dog.jpg 在 public 文件夹中</span>
                    </div>
                 )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90" />
                
                <div className="absolute bottom-6 left-6 text-white w-full pr-12">
                  <div className="inline-block bg-pink-500 text-white text-[10px] font-bold px-2 py-1 rounded-full mb-2 uppercase tracking-wide flex items-center gap-1 w-fit">
                    <ShieldCheck size={12} /> 验证通过
                  </div>
                  <h2 className="text-3xl font-hand font-bold leading-none drop-shadow-md">
                    28岁生日快乐<br/>妈妈！
                  </h2>
                </div>

                <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 font-bold w-24 h-24 rounded-full flex items-center justify-center rotate-12 shadow-lg z-10 border-4 border-white">
                  <div className="text-center leading-tight text-xs pt-3 pr-1">
                    官方认证<br/><span className="text-lg">最棒</span><br/>铲屎官
                  </div>
                </div>
              </div>

              {/* Message Area */}
              <div className="p-8 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed relative">
                
                {/* Decoration: Sausage Dog Footer */}
                <div className="absolute bottom-2 right-4 opacity-20 pointer-events-none">
                    <SausageDog className="w-24 h-12" />
                </div>

                {message ? (
                  <>
                    <div className="text-center">
                        <h3 className="font-serif text-xl font-bold text-neutral-800 leading-tight mb-3">
                        {message.headline}
                        </h3>
                        <div className="mx-auto flex items-center justify-center gap-2 text-pink-300">
                            <Bone size={12} fill="currentColor" />
                            <div className="w-12 h-1 bg-pink-400 rounded-full" />
                            <Bone size={12} fill="currentColor" />
                        </div>
                    </div>

                    <div className="relative px-2">
                        <Sparkles className="absolute -top-6 -left-2 text-yellow-400 w-6 h-6 animate-pulse" />
                        <p className="text-neutral-600 font-hand text-lg leading-relaxed text-justify relative z-10">
                        {message.body}
                        </p>
                        <Heart className="absolute -bottom-6 -right-2 text-pink-400 w-5 h-5 animate-bounce" />
                    </div>

                    <div className="pt-6 mt-4 flex items-center justify-center border-t border-dashed border-neutral-200">
                      <div className="flex flex-col items-center gap-1 text-center">
                        <div className="bg-pink-50 p-3 rounded-full mb-1">
                            <SausageDog className="w-16 h-8" />
                        </div>
                        <span className="font-mono-custom text-[10px] text-neutral-400 uppercase tracking-widest">签署人</span>
                        <span className="font-hand font-bold text-lg text-neutral-800">{message.signature}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4 animate-pulse py-8">
                    <div className="h-4 bg-neutral-100 rounded w-3/4 mx-auto"></div>
                    <div className="h-3 bg-neutral-100 rounded w-full"></div>
                    <div className="h-3 bg-neutral-100 rounded w-5/6"></div>
                    <div className="h-3 bg-neutral-100 rounded w-4/5"></div>
                  </div>
                )}
              </div>
              
              {/* Interactive Footer */}
              <div className="bg-pink-50 p-4 text-center border-t border-pink-100">
                 <button 
                  onClick={() => { setStage(AppStage.LOCKED); setLogs([]); setPetProgress(0); }}
                  className="text-pink-600 text-sm font-bold hover:text-pink-800 transition-colors flex items-center justify-center gap-2 w-full py-2"
                 >
                   <PartyPopper size={18} /> 再来一次惊喜
                 </button>
              </div>
            </div>
            
            <p className="text-center text-neutral-400 text-[10px] mt-8 font-mono-custom opacity-50">
                由全世界最爱你的修勾设计 v2.8
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default App;