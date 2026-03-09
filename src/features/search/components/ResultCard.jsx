import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../config/routes";
import PropertyCard from "../../../shared/ui/property/PropertyCard";

export default function ResultCard({ listing, index = 0 }) {
  const navigate = useNavigate();

  const images =
    Array.isArray(listing.images) && listing.images.length
      ? listing.images
      : [listing.imageSrc || listing.image].filter(Boolean);

  const item = {
    image: images[0],
    images,
    title: listing.title,
    location: listing.address || listing.location,
    roomsLabel: listing.roomsLabel ?? listing.meta?.rooms,
    areaLabel: listing.areaLabel ?? listing.meta?.area,
    verified: listing.verified ?? listing.badges?.ownerVerified ?? listing.badges?.verified,
    isNew: listing.isNew ?? listing.badges?.isNew,
    price: listing.price,
  };

  const handleOpenDetails = () => {
    navigate(ROUTES.listing(listing.id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.04, 0.28),
        ease: "easeOut",
      }}
    >
      <PropertyCard
        variant="search"
        accent={listing.accent || "#D66557"}
        item={item}
        onDetails={handleOpenDetails}
        onToggleFavorite={listing.onToggleFavorite || (() => {})}
        onChat={listing.onChat || (() => {})}
        onBookVisit={listing.onBookVisit || (() => {})}
        onPrecheck={listing.onPrecheck || (() => {})}
      />
    </motion.div>
  );
}