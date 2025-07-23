import React, { useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'

const menuItems = [
  {
    title: 'বোর্ড সম্পর্কিত',
    submenu: [
      'বোর্ড পরিচিতি',
      'সভাপতির বাণী',
      'পরিচালনা পর্ষদ',
      'কর্মকর্তাবৃন্দ'
    ]
  },
  {
    title: 'কমিটি',
    submenu: [
      'শিক্ষা কমিটি',
      'পরীক্ষা কমিটি',
      'ক্রীড়া কমিটি',
      'সাংস্কৃতিক কমিটি'
    ]
  },
  {
    title: 'ভর্তি নির্দেশিকা',
    submenu: [
      'ভর্তির নিয়মাবলী',
      'প্রয়োজনীয় কাগজপত্র',
      'ভর্তি ফি',
      'ভর্তি পরীক্ষা'
    ]
  },
  {
    title: 'সোনালী সেবা',
    submenu: [
      'অনলাইন আবেদন',
      'ডিজিটাল সেবা',
      'ই-বুক',
      'অনলাইন ক্লাস'
    ]
  },
  {
    title: 'ফলাফল',
    submenu: [
      'পরীক্ষার ফলাফল',
      'বৃত্তি পরীক্ষা',
      'প্রতিযোগিতার ফলাফল',
      'মেধা তালিকা'
    ]
  },
  {
    title: 'সকল ফরমস',
    submenu: [
      'ভর্তির ফরম',
      'বৃত্তির ফরম',
      'ছাড়পত্রের ফরম',
      'প্রশংসাপত্রের ফরম'
    ]
  },
  {
    title: 'যোগাযোগ ও ফিডব্যাক',
    submenu: [
      'যোগাযোগের ঠিকানা',
      'ফিডব্যাক ফরম',
      'অভিযোগ বক্স',
      'জরুরি যোগাযোগ'
    ]
  },
  {
    title: 'গ্যালারি',
    submenu: [
      'ছবির গ্যালারি',
      'ভিডিও গ্যালারি',
      'অনুষ্ঠানের ছবি',
      'পুরস্কার বিতরণী'
    ]
  }
]

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-xl font-bold text-blue-600">
              আদর্শ উচ্চ বিদ্যালয়
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200">
                  {item.title}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {/* Dropdown */}
                {activeDropdown === index && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
                    {item.submenu.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="py-2 space-y-1">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                    className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  >
                    {item.title}
                    <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === index && (
                    <div className="pl-6 py-2 space-y-1">
                      {item.submenu.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}