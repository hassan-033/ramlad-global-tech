
const blogPosts = [
  {
    title: "5 Reasons to Switch to Solar Energy in Nigeria",
    date: "October 26, 2025",
    author: "Ramlad Global Tech",
    image: "Images/blog1.jpg",
    excerpt: "Discover the top benefits of switching to solar power for your home or business in Nigeria, from cost savings to energy independence.",
  },
  {
    title: "How to Choose the Right CCTV System for Your Business",
    date: "October 22, 2025",
    author: "Ramlad Global Tech",
    image: "Images/blog2.jpg",
    excerpt: "A comprehensive guide to selecting the best CCTV system for your business needs, including camera types, storage, and installation.",
  },
  {
    title: "The Ultimate Guide to Electric Fence Installation in Lagos",
    date: "October 18, 2025",
    author: "Ramlad Global Tech",
    image: "Images/blog3.jpg",
    excerpt: "Learn everything you need to know about installing an electric fence in Lagos, from legal requirements to maintenance.",
  },
];

const socialMediaStrategy = {
  platforms: ["Facebook", "Instagram", "LinkedIn"],
  content: [
    "Share blog posts on all platforms.",
    "Post project photos and videos on Instagram and Facebook.",
    "Share industry news and articles on LinkedIn.",
    "Run targeted ads on Facebook and Instagram to reach potential customers.",
  ],
};

function displayBlogPosts() {
  const blogPostsContainer = document.getElementById("blog-posts");
  blogPosts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("col-lg-4", "col-md-6", "mb-4");
    postElement.innerHTML = `
      <div class="card h-100">
        <img src="${post.image}" class="card-img-top" alt="${post.title}">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.excerpt}</p>
          <a href="#" class="btn btn-primary">Read More</a>
        </div>
        <div class="card-footer">
          <small class="text-muted">By ${post.author} on ${post.date}</small>
        </div>
      </div>
    `;
    blogPostsContainer.appendChild(postElement);
  });
}

document.addEventListener("DOMContentLoaded", displayBlogPosts);
