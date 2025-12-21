"use client";

import {
  CircularGallery,
  type GalleryItem,
} from "@/components/ui/circular-gallery-2";

const galleryItems: GalleryItem[] = [
  { image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", text: "Architecture" },
  { image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&q=80", text: "Interior" },
  { image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", text: "Office" },
  { image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80", text: "Nature" },
  { image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80", text: "Mountains" },
  { image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80", text: "Technology" },
  { image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80", text: "Wildlife" },
  { image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80", text: "Flowers" },
  { image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&q=80", text: "Sunrise" },
  { image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80", text: "Lake" },
  { image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80", text: "Cityscape" },
  { image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80", text: "Forest" },
];

export default function CircularGalleryDemo() {
  return (
    <div className="relative h-[600px] w-full rounded-lg overflow-hidden">
      <CircularGallery
        items={galleryItems}
        bend={3}
        borderRadius={0.05}
        scrollEase={0.02}
      />
    </div>
  );
}

