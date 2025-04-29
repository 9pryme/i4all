export default function PostCardStyles() {
  return (
    <style jsx global>{`
      /* Post Card Styles */
      .post-card {
        background-color: white;
        border-radius: 18px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .post-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
      }
      
      .post-card-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        background-color: #f3f4f6; /* Light gray background for fallback */
      }
      
      .post-card-content {
        padding: 1.5rem;
      }
      
      .post-card-title {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.5rem;
        line-height: 1.3;
        margin-bottom: 0.75rem;
        font-weight: 600;
        color: #2C3639;
      }
      
      .post-card-excerpt {
        font-size: 0.9rem;
        line-height: 1.6;
        color: #4B5563;
        margin-bottom: 1rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .post-card-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.8rem;
        color: #6B7280;
      }
      
      .post-card-date {
        display: flex;
        align-items: center;
      }
      
      .post-card-date svg {
        width: 16px;
        height: 16px;
        margin-right: 4px;
      }
      
      .post-card-categories {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin-top: 0.75rem;
      }
      
      .post-card-category {
        font-size: 0.7rem;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .post-card-category.green {
        background-color: rgba(16, 185, 129, 0.1);
        color: #0C8E61;
      }
      
      .post-card-category.yellow {
        background-color: rgba(245, 158, 11, 0.1);
        color: #D97706;
      }
      
      .post-card-category.orange {
        background-color: rgba(239, 68, 68, 0.1);
        color: #E36414;
      }
      
      .post-card-category.blue {
        background-color: rgba(59, 130, 246, 0.1);
        color: #2563EB;
      }
      
      /* Special Featured Post Card */
      .post-card-featured {
        grid-column: span 2;
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
      
      @media (max-width: 768px) {
        .post-card-featured {
          grid-column: span 1;
          grid-template-columns: 1fr;
        }
        
        .post-card-featured .post-card-image {
          height: 240px;
        }
      }
      
      .post-card-featured .post-card-image {
        height: 100%;
      }
      
      .post-card-featured .post-card-title {
        font-size: 1.875rem;
      }
    `}</style>
  );
} 