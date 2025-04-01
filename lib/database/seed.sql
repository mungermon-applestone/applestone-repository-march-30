-- Seed data for AppleStone Solutions Website

-- Hero Section
INSERT INTO hero_section (title, description, image_url, button_text, button_link, secondary_button_text, secondary_button_link)
VALUES (
  'Vend Anything You Sell',
  'Our cloud-based platform integrates with vending machines from all major manufacturers, giving you complete control of your fleet.',
  '/placeholder.svg?height=550&width=550',
  'See It In Action',
  '#features',
  'Integration Partners',
  '#partners'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  button_text = EXCLUDED.button_text,
  button_link = EXCLUDED.button_link,
  secondary_button_text = EXCLUDED.secondary_button_text,
  secondary_button_link = EXCLUDED.secondary_button_link;

-- Page Headers
INSERT INTO page_headers (page_key, title, description, image_url)
VALUES 
  ('products', 'Our Product Types', 'Explore the different types of products you can sell through our vending machines.', '/placeholder.svg?height=300&width=1200'),
  ('business-goals', 'Achieve Your Business Goals', 'Our vending machine software helps you meet your business goals with powerful features and insights.', '/placeholder.svg?height=300&width=1200'),
  ('machines', 'Our Vending Machines', 'Explore our range of vending machines designed for different products and environments.', '/placeholder.svg?height=300&width=1200'),
  ('technology', 'Our Technology', 'Cutting-edge vending machine software built for reliability, security, and scalability.', '/placeholder.svg?height=300&width=1200'),
  ('about', 'About AppleStone Solutions', 'We're revolutionizing the vending industry with innovative software solutions.', '/placeholder.svg?height=300&width=1200')
ON CONFLICT (page_key) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url;

-- Product Types
INSERT INTO product_types (slug, title, description, image_url, features)
VALUES 
  ('grocery', 'Grocery', 'Sell grocery items through automated retail with inventory management and freshness tracking.', '/placeholder.svg?height=300&width=400', ARRAY['Freshness Tracking', 'Inventory Management', 'Temperature Control']),
  ('vape', 'Vape', 'Age verification and compliance features for vape product sales through automated retail.', '/placeholder.svg?height=300&width=400', ARRAY['Age Verification', 'Compliance Tracking', 'Inventory Management']),
  ('cannabis', 'Cannabis', 'Secure, compliant cannabis sales with age verification and inventory tracking.', '/placeholder.svg?height=300&width=400', ARRAY['Age Verification', 'Compliance Tracking', 'Secure Storage']),
  ('fresh-food', 'Fresh Food', 'Temperature monitoring and freshness tracking for perishable food items.', '/placeholder.svg?height=300&width=400', ARRAY['Temperature Control', 'Freshness Tracking', 'Inventory Management'])
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  features = EXCLUDED.features;

-- Business Goals
INSERT INTO business_goals (slug, title, description, image_url, benefits)
VALUES 
  ('increase-revenue', 'Increase Revenue', 'Boost your vending machine revenue with smart pricing, promotions, and inventory optimization.', '/placeholder.svg?height=300&width=400', ARRAY['Smart Pricing', 'Targeted Promotions', 'Inventory Optimization']),
  ('reduce-costs', 'Reduce Costs', 'Cut operational costs with route optimization, remote monitoring, and predictive maintenance.', '/placeholder.svg?height=300&width=400', ARRAY['Route Optimization', 'Remote Monitoring', 'Predictive Maintenance']),
  ('improve-customer-experience', 'Improve Customer Experience', 'Enhance customer satisfaction with touchless payments, loyalty programs, and personalized offers.', '/placeholder.svg?height=300&width=400', ARRAY['Touchless Payments', 'Loyalty Programs', 'Personalized Offers']),
  ('expand-operations', 'Expand Operations', 'Scale your vending business with data-driven insights and automated inventory management.', '/placeholder.svg?height=300&width=400', ARRAY['Data-Driven Insights', 'Automated Inventory', 'Scalable Infrastructure'])
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  benefits = EXCLUDED.benefits;

-- Machines
INSERT INTO machines (name, description, image_url, category, features, status, location)
VALUES 
  ('Standard Vending Machine', 'Traditional snack and beverage vending machine', '/placeholder.svg?height=300&width=400', 'vending-machine', ARRAY['Multiple Trays', 'Digital Display', 'Card Payment'], 'Active', 'Main Office - Lobby'),
  ('Refrigerated Beverage Machine', 'Cold drink vending with energy-efficient cooling', '/placeholder.svg?height=300&width=400', 'vending-machine', ARRAY['Temperature Control', 'Energy Efficient', 'Multiple Sizes'], 'Active', 'Downtown - Food Court'),
  ('Frozen Food Vending', 'Frozen food and ice cream vending solution', '/placeholder.svg?height=300&width=400', 'vending-machine', ARRAY['Deep Freeze', 'Temperature Monitoring', 'Energy Efficient'], 'Maintenance', 'Hospital - 3rd Floor'),
  ('Smart Locker System', 'Modular locker system for package delivery', '/placeholder.svg?height=300&width=400', 'locker', ARRAY['Modular Design', 'Digital Access', 'Notification System'], 'Active', 'Apartment Complex - Mail Room')
ON CONFLICT (id) DO NOTHING;

-- Updates
INSERT INTO updates (title, excerpt, content, date, category, slug, image_url)
VALUES 
  ('New Cannabis Vending Solution', 'Introducing our new compliant cannabis vending solution for dispensaries.', '# New Cannabis Vending Solution\n\nWe''re excited to announce our new cannabis vending solution designed specifically for dispensaries. This solution includes age verification, compliance tracking, and inventory management features to help dispensaries streamline their operations while maintaining compliance with local regulations.\n\n## Key Features\n\n- Age verification with ID scanning\n- Compliance tracking and reporting\n- Inventory management with real-time updates\n- Integration with popular POS systems\n- Remote monitoring and management\n\nContact us today to learn more about our cannabis vending solution.', '2023-10-15', 'Product', 'new-cannabis-vending-solution', '/placeholder.svg?height=400&width=800'),
  ('Q3 2023 Software Update', 'Our latest software update includes new features and improvements.', '# Q3 2023 Software Update\n\nWe''re pleased to announce our Q3 2023 software update, which includes several new features and improvements to help you get the most out of your vending machines.\n\n## New Features\n\n- Dynamic pricing based on time of day and inventory levels\n- Enhanced reporting with customizable dashboards\n- Improved route optimization algorithm\n- New mobile app features for on-the-go management\n\n## Improvements\n\n- Faster loading times for the dashboard\n- Improved reliability of real-time monitoring\n- Enhanced security features\n- Better compatibility with older vending machines\n\nThe update will be rolled out automatically to all customers over the next two weeks.', '2023-09-01', 'Software', 'q3-2023-software-update', '/placeholder.svg?height=400&width=800'),
  ('Partnership with PayQuick', 'We''ve partnered with PayQuick to offer more payment options for your customers.', '# Partnership with PayQuick\n\nWe''re excited to announce our new partnership with PayQuick, a leading provider of mobile payment solutions. This partnership will allow your customers to pay for their purchases using the PayQuick app, which is used by over 50 million people worldwide.\n\n## Benefits\n\n- Increased payment options for your customers\n- Faster transaction times\n- Reduced cash handling\n- Access to PayQuick''s loyalty program\n- Detailed transaction reporting\n\nThe PayQuick integration will be available to all customers in our next software update.', '2023-08-15', 'Partnership', 'partnership-with-payquick', '/placeholder.svg?height=400&width=800'),
  ('Expanding to Canada', 'We''re excited to announce our expansion into the Canadian market.', '# Expanding to Canada\n\nWe''re thrilled to announce that AppleStone Solutions is expanding into the Canadian market. After years of success in the United States, we''re bringing our innovative vending machine software to Canadian operators.\n\n## What This Means\n\n- Local support team in Toronto\n- Compliance with Canadian regulations\n- Integration with Canadian payment processors\n- Support for bilingual interfaces (English and French)\n- Canadian hosting options for data sovereignty\n\nWe''re already working with several Canadian vending operators and are excited to bring our solutions to more businesses across Canada.', '2023-07-01', 'Company', 'expanding-to-canada', '/placeholder.svg?height=400&width=800')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  date = EXCLUDED.date,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url;

-- Page Content for About Page
INSERT INTO page_content (page_name, content)
VALUES (
  'about',
  '{
    "title": "About AppleStone Solutions",
    "description": "We''re revolutionizing the vending industry with innovative software solutions.",
    "story": {
      "text": "Founded in 2018, AppleStone Solutions was born from a simple observation: vending machine operators were struggling with fragmented, outdated software that couldn''t keep up with modern retail demands. Our founders, with backgrounds in both retail technology and vending operations, set out to create a unified platform that could work with any machine from any manufacturer, giving operators complete control and visibility over their entire fleet. Today, we serve hundreds of vending operators across North America, helping them increase revenue, reduce costs, and deliver better experiences to their customers.",
      "image": "/placeholder.svg?height=400&width=600"
    },
    "values": [
      {
        "title": "Customer Success",
        "description": "We''re only successful when our customers are successful. We measure our performance by the results we deliver for them."
      },
      {
        "title": "Innovation",
        "description": "We''re constantly pushing the boundaries of what''s possible in vending technology, always looking for better ways to solve problems."
      },
      {
        "title": "Reliability",
        "description": "Our customers depend on our platform to run their businesses. We take that responsibility seriously with a commitment to uptime and performance."
      },
      {
        "title": "Transparency",
        "description": "We believe in open, honest communication with our customers, partners, and each other."
      }
    ],
    "team": [
      {
        "name": "Sarah Johnson",
        "role": "CEO & Co-Founder",
        "bio": "Former VP of Technology at RetailTech with 15+ years of experience in retail software.",
        "image": "/placeholder.svg?height=300&width=300"
      },
      {
        "name": "Michael Chen",
        "role": "CTO & Co-Founder",
        "bio": "Previously led engineering at VendCorp, with expertise in IoT and cloud architecture.",
        "image": "/placeholder.svg?height=300&width=300"
      },
      {
        "name": "David Rodriguez",
        "role": "COO",
        "bio": "20+ years of operations experience in the vending industry, former owner of a regional vending company.",
        "image": "/placeholder.svg?height=300&width=300"
      },
      {
        "name": "Lisa Patel",
        "role": "VP of Product",
        "bio": "Product leader with experience at multiple successful SaaS companies in the retail space.",
        "image": "/placeholder.svg?height=300&width=300"
      }
    ]
  }'
) ON CONFLICT (page_name) DO UPDATE SET
  content = EXCLUDED.content;

-- Page Content for Technology Page
INSERT INTO page_content (page_name, content)
VALUES (
  'technology',
  '{
    "title": "Our Technology",
    "description": "Cutting-edge vending machine software built for reliability, security, and scalability.",
    "sections": [
      {
        "title": "Cloud-Based Management",
        "description": "Our cloud-based management system allows you to monitor and manage your vending machines from anywhere in the world.",
        "image": "/placeholder.svg?height=400&width=600",
        "features": [
          {
            "icon": "activity",
            "title": "Real-time Monitoring",
            "description": "Track sales, inventory, and machine status in real-time"
          },
          {
            "icon": "settings",
            "title": "Remote Management",
            "description": "Update prices, products, and settings remotely"
          },
          {
            "icon": "bell",
            "title": "Automated Alerts",
            "description": "Receive notifications for low inventory, maintenance needs, or unusual activity"
          }
        ]
      },
      {
        "title": "IoT Connectivity",
        "description": "Our machines use advanced IoT technology to stay connected and provide real-time data and control.",
        "image": "/placeholder.svg?height=400&width=600",
        "features": [
          {
            "icon": "wifi",
            "title": "Multiple connectivity options",
            "description": "Cellular, Wi-Fi, and Ethernet"
          },
          {
            "icon": "battery",
            "title": "Low-power operation",
            "description": "Extended battery life"
          },
          {
            "icon": "shield",
            "title": "Secure communication",
            "description": "End-to-end encryption"
          }
        ]
      },
      {
        "title": "Enterprise-Grade Security",
        "description": "We take security seriously with multiple layers of protection for your data and operations.",
        "image": "/placeholder.svg?height=400&width=600",
        "features": [
          {
            "icon": "check-circle",
            "title": "SOC 2 Type II certified",
            "description": "Enterprise-grade security"
          },
          {
            "icon": "users",
            "title": "Role-based access control",
            "description": "With multi-factor authentication"
          },
          {
            "icon": "shield-check",
            "title": "Regular security audits",
            "description": "Penetration testing and compliance checks"
          }
        ]
      }
    ]
  }'
) ON CONFLICT (page_name) DO UPDATE SET
  content = EXCLUDED.content;

-- Testimonials
INSERT INTO testimonials (name, company, quote, image_url, rating)
VALUES 
  ('John Smith', 'City Vending Co.', 'AppleStone''s software has transformed our business. We''ve seen a 30% increase in revenue and a 25% decrease in maintenance costs.', '/placeholder.svg?height=150&width=150', 5),
  ('Maria Rodriguez', 'Campus Refreshments', 'The real-time monitoring and alerts have been a game-changer for our campus vending operations.', '/placeholder.svg?height=150&width=150', 5),
  ('Robert Johnson', 'Metro Vending Solutions', 'The route optimization alone has saved us thousands in fuel and labor costs. Highly recommended!', '/placeholder.svg?height=150&width=150', 4),
  ('Sarah Williams', 'Healthcare Refreshments Inc.', 'Their cannabis compliance features have made it possible for us to expand into a new market with confidence.', '/placeholder.svg?height=150&width=150', 5)
ON CONFLICT (id) DO NOTHING;

-- FAQs
INSERT INTO faqs (question, answer, category, "order")
VALUES 
  ('What types of vending machines does your software work with?', 'Our software works with vending machines from all major manufacturers, including Crane, AMS, Vengo, Fastcorp, and more. We offer both retrofit solutions for existing machines and integrated solutions for new machines.', 'General', 1),
  ('How does the cloud-based management system work?', 'Our cloud-based system connects to your vending machines via cellular, Wi-Fi, or Ethernet connections. This allows you to monitor and manage your machines remotely through our web dashboard or mobile app.', 'Technology', 2),
  ('What payment methods are supported?', 'We support all major payment methods, including credit/debit cards, mobile payments (Apple Pay, Google Pay), and traditional cash payments. Our system can also integrate with custom payment solutions.', 'Payments', 3),
  ('How do you handle compliance for age-restricted products?', 'Our system includes robust age verification features, including ID scanning, facial recognition, and integration with age verification services. We also provide comprehensive compliance reporting.', 'Compliance', 4),
  ('What kind of support do you offer?', 'We offer 24/7 technical support via phone, email, and chat. Our support team includes vending industry experts who understand your business needs. We also provide comprehensive documentation and training resources.', 'Support', 5)
ON CONFLICT (id) DO NOTHING;

-- Settings
INSERT INTO settings (key, value, description)
VALUES 
  ('site_name', 'AppleStone Solutions', 'The name of the website'),
  ('contact_email', 'info@applestonesolutions.com', 'Contact email address'),
  ('contact_phone', '(555) 123-4567', 'Contact phone number'),
  ('social_twitter', 'https://twitter.com/applestonesolutions', 'Twitter URL'),
  ('social_linkedin', 'https://linkedin.com/company/applestonesolutions', 'LinkedIn URL'),
  ('social_facebook', 'https://facebook.com/applestonesolutions', 'Facebook URL'),
  ('footer_copyright', '© 2023 AppleStone Solutions. All rights reserved.', 'Footer copyright text')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  description = EXCLUDED.description;

