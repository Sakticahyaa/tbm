/**
 * useBooks Custom Hook
 * 
 * Purpose:
 * - Manages book data fetching from Supabase database
 * - Handles location-based filtering, search, and additional filters
 * - Provides loading states and error handling
 * - Automatically refetches data when dependencies change
 * 
 * Features:
 * - Real-time data fetching with dependency tracking
 * - Integrated search functionality
 * - Location-based filtering
 * - Genre and type filtering
 * - Error handling with fallback states
 * - Data transformation for component compatibility
 * 
 * Access: Used in BookListPage component
 * Dependencies: Requires bookService for database operations
 */

import { useState, useEffect } from 'react'
import { bookService } from '../services/bookService'

/**
 * useBooks Hook
 * 
 * @param {string} location - Location filter ('all' or specific location)
 * @param {Object} filters - Additional filters {aliran: string, jenis: string}
 * @param {string} searchTerm - Search query string
 * @returns {Object} - {books: Array, loading: boolean, error: string, refetch: function}
 */
export const useBooks = (location = 'all', filters = {}, searchTerm = '') => {
  // Hook state management
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /**
   * Book Data Fetching Function
   * 
   * Purpose: Handles all book data retrieval logic
   * - Determines appropriate service method based on parameters
   * - Transforms database response to component format
   * - Manages loading and error states
   * - Provides fallback for service failures
   */
  const fetchBooks = async () => {
    try {
      setLoading(true)
      setError(null)

      let data = []

      // Determine fetching strategy based on parameters
      if (searchTerm || filters.aliran || filters.jenis) {
        // Use search function when there are search terms or filters
        // Use search function when there are search terms or filters
        data = await bookService.searchBooks(searchTerm, { ...filters, location })
      } else if (location === 'all') {
        // Get all books when no location filter
        // Get all books
        data = await bookService.getAllBooks()
      } else {
        // Get books filtered by specific location
        // Get books by location
        data = await bookService.getBooksByLocation(location)
      }

      /**
       * Data Transformation
       * 
       * Purpose: Converts database field names to component expectations
       * - Maps database column names to component property names
       * - Ensures consistent data structure across the application
       * - Handles potential missing fields gracefully
       */
      // Transform data to match the existing structure
      const transformedData = data.map(book => ({
        id: book.id,
        judul: book.judul_buku,
        penulis: book.penulis_buku,
        aliran: book.aliran_buku,
        jenis: book.jenis_buku,
        lokasi: book.lokasi_buku,
        sinopsis: book.sinopsis_buku,
        penerbit: book.penerbit_buku,
        ilustrator: book.ilustrator_buku,
        isbn: book.isbn
      }))

      setBooks(transformedData)
    } catch (err) {
      // Error handling with user-friendly messages
      setError(err.message)
      console.error('Error in useBooks:', err)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Effect Hook for Data Fetching
   * 
   * Purpose: Automatically refetches data when dependencies change
   * - Triggers on location changes
   * - Triggers on filter changes
   * - Triggers on search term changes
   * - Provides real-time data updates
   */
  useEffect(() => {
    fetchBooks()
  }, [location, filters.aliran, filters.jenis, searchTerm])

  // Return hook interface
  return {
    books,
    loading,
    error,
    refetch: fetchBooks
  }
}