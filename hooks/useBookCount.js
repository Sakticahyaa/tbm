/**
 * useBookCount Custom Hook
 * 
 * Purpose:
 * - Fetches total count of books from database
 * - Provides loading state for count display
 * - Used specifically for landing page statistics
 * - Handles errors gracefully with fallback values
 * 
 * Features:
 * - Automatic data fetching on component mount
 * - Loading state management
 * - Error handling with fallback count
 * - Manual refetch capability
 * 
 * Access: Used in LandingPage component
 * Dependencies: Requires bookService for database operations
 */

import { useState, useEffect } from 'react'
import { bookService } from '../services/bookService'

/**
 * useBookCount Hook
 * 
 * @returns {Object} - {bookCount: number, loading: boolean, refetch: function}
 */
export const useBookCount = () => {
  // Default fallback count for when database is unavailable
  const [bookCount, setBookCount] = useState(738) // Default fallback
  const [loading, setLoading] = useState(true)

  /**
   * Book Count Fetching Function
   * 
   * Purpose: Retrieves total book count from database
   * - Fetches all books and counts them
   * - Updates state with actual count
   * - Falls back to default value on error
   * - Manages loading state throughout process
   */
  const fetchBookCount = async () => {
    try {
      setLoading(true)
      // Fetch all books to get accurate count
      const books = await bookService.getAllBooks()
      setBookCount(books.length)
    } catch (error) {
      console.error('Error fetching book count:', error)
      // Keep default value on error - provides graceful degradation
      // Keep default value on error
    } finally {
      setLoading(false)
    }
  }

  /**
   * Effect Hook for Initial Data Loading
   * 
   * Purpose: Automatically fetches book count when hook is first used
   * - Runs once on component mount
   * - No dependencies means it only runs once
   */
  useEffect(() => {
    fetchBookCount()
  }, [])

  // Return hook interface
  return {
    bookCount,
    loading,
    refetch: fetchBookCount
  }
}