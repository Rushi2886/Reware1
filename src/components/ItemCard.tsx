import React from 'react';
import { Link } from 'react-router-dom';
import { ClothingItem } from '../types';
import { Eye, Heart } from 'lucide-react';

interface ItemCardProps {
  item: ClothingItem;
  showActions?: boolean;
}

export function ItemCard({ item, showActions = true }: ItemCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={item.images[0]} 
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            item.condition === 'New' ? 'bg-emerald-100 text-emerald-700' :
            item.condition === 'Like New' ? 'bg-blue-100 text-blue-700' :
            item.condition === 'Good' ? 'bg-yellow-100 text-yellow-700' :
            'bg-orange-100 text-orange-700'
          }`}>
            {item.condition}
          </span>
        </div>
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Not Available</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-1">{item.title}</h3>
          <span className="text-primary-600 font-bold text-sm">{item.pointValue} pts</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>Size: {item.size}</span>
          <span>{item.category}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {item.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {showActions && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">by {item.uploaderName}</span>
            <Link 
              to={`/item/${item.id}`}
              className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">View</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}