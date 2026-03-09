// src/features/landing/sections/components/ListingCard.jsx
import React from "react";
import { SITE } from "../../../../config/siteContent";
import PropertyCard from "../../../../shared/ui/property/PropertyCard";

export default function ListingCard({ item, onDetails = () => {}, onToggleFavorite = () => {}, className }) {
  return (
    <PropertyCard
      variant="landing"
      item={item}
      verifiedLabel={SITE.listing.badges.verified}
      newLabel={SITE.listing.badges.new}
      detailsLabel={SITE.listing.details}
      onDetails={onDetails}
      onToggleFavorite={onToggleFavorite}
      className={className}
    />
  );
}