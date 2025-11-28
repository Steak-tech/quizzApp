"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { genConfig } from "react-nice-avatar";

const Avatar = dynamic(
  () => import("react-nice-avatar").then((mod) => mod.default),
  { ssr: false }
);

const AVATAR_COUNT = 12; // nombre d'avatars proposés dans la modal

export default function RandomAvatar() {
  const [config, setConfig] = useState(() => genConfig());
  const [modalOpen, setModalOpen] = useState(false);

  // Générer plusieurs avatars à afficher dans la modal
  const avatarOptions = useMemo(() => {
    return Array.from({ length: AVATAR_COUNT }, () => genConfig());
  }, []);

  return (
    <>
      {/* Avatar principal */}
      <div className="cursor-pointer" onClick={() => setModalOpen(true)}>
        <Avatar className="w-32 h-32" {...config} />
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Choisis ton avatar</h2>
            <div className="grid grid-cols-3 gap-4">
              {avatarOptions.map((opt, index) => (
                <div
                  key={index}
                  className="cursor-pointer border rounded-lg p-2 hover:ring-2 hover:ring-blue-500"
                  onClick={() => {
                    setConfig(opt); // changer avatar principal
                    setModalOpen(false); // fermer modal
                  }}
                >
                  <Avatar className="w-20 h-20" {...opt} />
                </div>
              ))}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => setModalOpen(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
