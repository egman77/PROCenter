﻿#region License Header

// /*******************************************************************************
//  * Open Behavioral Health Information Technology Architecture (OBHITA.org)
//  * 
//  * Redistribution and use in source and binary forms, with or without
//  * modification, are permitted provided that the following conditions are met:
//  *     * Redistributions of source code must retain the above copyright
//  *       notice, this list of conditions and the following disclaimer.
//  *     * Redistributions in binary form must reproduce the above copyright
//  *       notice, this list of conditions and the following disclaimer in the
//  *       documentation and/or other materials provided with the distribution.
//  *     * Neither the name of the <organization> nor the
//  *       names of its contributors may be used to endorse or promote products
//  *       derived from this software without specific prior written permission.
//  * 
//  * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
//  * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
//  * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
//  * DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
//  * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
//  * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
//  * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
//  * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
//  * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
//  * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//  ******************************************************************************/

#endregion

namespace ProCenter.Domain.AssessmentModule
{
    #region Using Statements

    using System;

    using ProCenter.Domain.AssessmentModule.Event;

    #endregion

    /// <summary>The item instance class.</summary>
    public class ItemInstance
    {
        #region Constructors and Destructors

        /// <summary>Initializes a new instance of the <see cref="ItemInstance" /> class.</summary>
        /// <param name="itemDefinitionCode">The item definition code.</param>
        /// <param name="value">The value.</param>
        /// <param name="isRequired">If set to <c>True</c> is required.</param>
        public ItemInstance ( string itemDefinitionCode, object value, bool isRequired )
        {
            ItemDefinitionCode = itemDefinitionCode;
            Value = value;
            IsRequired = isRequired;
        }

        #endregion

        #region Public Properties

        /// <summary>
        ///     Gets the item definition code.
        /// </summary>
        /// <value>
        ///     The item definition code.
        /// </value>
        public string ItemDefinitionCode { get; private set; }

        /// <summary>
        ///     Gets the value.
        /// </summary>
        /// <value>
        ///     The value.
        /// </value>
        public object Value { get; private set; }

        /// <summary>Gets a value indicating whether this is required.</summary>
        /// <value><c>True</c> if this is required; otherwise, <c>False</c>.</value>
        public bool IsRequired { get; private set; }

        #endregion

        #region Public Methods and Operators

        /// <summary>
        ///     Applies the specified item updated event.
        /// </summary>
        /// <param name="itemUpdatedEvent">The item updated event.</param>
        /// <exception cref="System.InvalidOperationException">Cannot update an item based on a different Item Definition.</exception>
        public void Apply ( ItemUpdatedEvent itemUpdatedEvent )
        {
            if ( itemUpdatedEvent.ItemDefinitionCode != ItemDefinitionCode )
            {
                throw new InvalidOperationException ( "Cannot update an item based on a different Item Definition." );
            }

            Value = itemUpdatedEvent.Value;
        }

        #endregion
    }
}