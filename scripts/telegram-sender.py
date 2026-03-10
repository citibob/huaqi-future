#!/usr/bin/env python3
"""
Telegram Message Sender with Retry Mechanism
"""

import time
import os

def send_telegram_message(message, max_retries=3, retry_interval=10):
    """
    Send Telegram message with retry mechanism
    
    Args:
        message: Message to send
        max_retries: Maximum retry attempts (default: 3)
        retry_interval: Seconds between retries (default: 10)
    
    Returns:
        bool: True if successful, False if failed
    """
    
    for attempt in range(1, max_retries + 1):
        try:
            # Use OpenClaw message tool
            result = {
                "action": "send",
                "channel": "telegram",
                "message": message
            }
            
            # In actual implementation, this would call the OpenClaw API
            print(f"Attempt {attempt}/{max_retries}: Sending message...")
            
            # If successful
            return True
            
        except Exception as e:
            print(f"Attempt {attempt} failed: {e}")
            
            if attempt < max_retries:
                print(f"Retrying in {retry_interval} seconds...")
                time.sleep(retry_interval)
            else:
                # Log failure
                log_error(message, str(e))
                return False
    
    return False

def log_error(message, error):
    """Log Telegram send failure"""
    log_dir = "/Users/hm/Desktop/pokemon-system/logs"
    os.makedirs(log_dir, exist_ok=True)
    
    with open(f"{log_dir}/telegram-error.log", "a") as f:
        from datetime import datetime
        f.write(f"[{datetime.now().isoformat()}] FAILED: {error}\n")
        f.write(f"Message: {message}\n")
        f.write(f"Status: NOTIFICATION_FAILED\n\n")

if __name__ == "__main__":
    # Test
    result = send_telegram_message("Test message with retry")
    print(f"Result: {result}")
