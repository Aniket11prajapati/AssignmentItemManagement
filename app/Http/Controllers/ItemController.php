<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Helpers\ApiResponseHelper;
use Exception;
use Illuminate\Validation\ValidationException;

class ItemController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Item::query()
                ->when($request->title, fn($q) => $q->where('title', 'LIKE', "%{$request->title}%"))
                ->when($request->start_date, fn($q) => $q->whereDate('date', '>=', $request->start_date))
                ->when($request->end_date, fn($q) => $q->whereDate('date', '<=', $request->end_date));

            $items = $query->paginate(10);

            return ApiResponseHelper::success('Items retrieved successfully', [
                'data' => $items->items(),
                'meta' => [
                    'current_page' => $items->currentPage(),
                    'total' => $items->total(),
                    'per_page' => $items->perPage(),
                    'last_page' => $items->lastPage(),
                ]
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching items: ' . $e->getMessage());
            return ApiResponseHelper::error('Failed to retrieve items', ['error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'items' => 'required|array|min:1',
                'items.*.title' => 'required|string|max:255',
                'items.*.description' => 'required|string|max:250',
                'items.*.quantity' => 'required|integer|min:1',
                'items.*.price' => 'required|numeric|min:0.01',
                'items.*.date' => 'required|date',
                'items.*.image' => 'required|file|image|max:2048',
            ]);

            $createdItems = [];

            foreach ($validated['items'] as $index => $item) {
                if (!$request->hasFile("items.$index.image")) {
                    return ApiResponseHelper::error('Image file is missing for item index ' . $index);
                }

                $file = $request->file("items.$index.image");
                $originalName = $file->getClientOriginalName();
                $timestampedName = time() . '_' . $originalName;
                $imagePath = $file->storeAs('public/images', $timestampedName);

                $createdItem = Item::create([
                    'title' => $item['title'],
                    'description' => $item['description'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'date' => $item['date'],
                    'image' => str_replace('public/', '', $imagePath),
                ]);

                $createdItems[] = $createdItem;
            }

            return ApiResponseHelper::success('Items created successfully', $createdItems, 201);
        } catch (ValidationException $e) {
            return ApiResponseHelper::error('Validation failed', $e->errors(), 422);
        } catch (Exception $e) {
            Log::error('Error creating items: ' . $e->getMessage());
            return ApiResponseHelper::error('Failed to create items', ['error' => $e->getMessage()], 500);
        }
    }
}
